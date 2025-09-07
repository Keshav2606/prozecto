const cdk = require('aws-cdk-lib');
const lambda = require('aws-cdk-lib/aws-lambda');
const iam = require('aws-cdk-lib/aws-iam');
const { SqsEventSource } = require('aws-cdk-lib/aws-lambda-event-sources');
const fs = require('fs');
const path = require('path');

class LambdaStack extends cdk.Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    const prefix = props.env.prefix;
    const secretKey = props.env.secret_key;
    const region = props.env.region;
    const account = props.env.account;
    const docBucket = props.env.doc_bucket;

    this.queues = props.queues;

    const functionConfig = props.functionConfig;

    this.lambdaFunctions = {};
    this.lambdaLayers = {};

    const lambdaExecutionRole = new iam.Role(this, `${prefix}LambdaExecutionRole`, {
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
      roleName: `${prefix}LambdaExecutionRole`,
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName("service-role/AWSLambdaBasicExecutionRole")
      ]
    });

    this.initializeLayers(prefix);

    functionConfig.forEach((func) => {
      console.log(`Creating Lambda function: ${prefix}${func.lambda}`);

      const runtime = this.getLambdaRuntime(func.runtime);
      const layers = this.getCompatibleLayers(runtime.family, func.lambda);

      const lambdaFunction = new lambda.Function(this, `${prefix}${func.lambda}`, {
        functionName: `${prefix}${func.lambda}`,
        runtime: runtime,
        handler: func.handler.trim(),
        code: lambda.Code.fromAsset(`./lambda_functions/${func.lambda}`),
        layers: layers,
        environment: this.getFunctionEnvironment(prefix, func.lambda, {
          secretKey,
          region,
          account,
          docBucket
        }),
        timeout: this.getFunctionTimeout(func.lambda),
        memorySize: this.getMemorySize(func.lambda),
        role: lambdaExecutionRole
      });

      if (func.sqsTrigger) {
        console.log(`Adding SQS trigger from queue "${func.sqsTrigger}" to function "${func.lambda}"`);

        // Find the queue object from the props passed into the stack
        const queueName = `${prefix}${func.sqsTrigger}`;
        const queue = this.queues[queueName];

        if (queue) {
          lambdaFunction.addEventSource(new SqsEventSource(queue, {
            batchSize: 10,
            reportBatchItemFailures: true,
          }));
        } else {
          console.error(`Error: Queue with name ${queueName} not found for SQS trigger.`);
        }
      }

      this.configureFunctionPermissions(lambdaExecutionRole, func.lambda, prefix, props);
      this.lambdaFunctions[func.lambda] = {
        function: lambdaFunction,
        isScheduled: func.isScheduled,
      };
    });
  }

  initializeLayers(prefix) {
    const layersPath = './layers';
    if (!fs.existsSync(layersPath)) return;

    const layerDirs = fs.readdirSync(layersPath).filter(layerName => {
      return fs.existsSync(path.join(layersPath, layerName));
    });

    layerDirs.forEach(layerName => {
      console.log(`Creating Lambda Layer: ${prefix}${layerName}`);

      let compatibleRuntimes = [lambda.Runtime.NODEJS_22_X];

      const layer = new lambda.LayerVersion(this, `${prefix}${layerName}`, {
        layerVersionName: `${prefix}${layerName}`,
        code: lambda.Code.fromAsset(path.join(layersPath, layerName)),
        compatibleRuntimes,
        removalPolicy: cdk.RemovalPolicy.RETAIN,
        description: `${layerName} layer`,
      });

      this.lambdaLayers[layerName] = layer;
    });

    console.log('Loaded layers:', Object.keys(this.lambdaLayers));
  }

  getLambdaRuntime(runtimeString) {
    return lambda.Runtime[runtimeString];
  }

  getCompatibleLayers(runtimeFamily, functionName) {
    const layers = [];

    if (runtimeFamily === lambda.RuntimeFamily.NODEJS) {
      if (this.lambdaLayers['modules_layer']) layers.push(this.lambdaLayers['modules_layer']);
      if (this.lambdaLayers['utils_layer']) layers.push(this.lambdaLayers['utils_layer']);
    }

    return layers;
  }

  getFunctionEnvironment(prefix, functionName, config) {
    const baseEnv = {
      PREFIX: prefix,
      SECRET_KEY: config.secretKey,
    };

    const sqsFunctions = ['requests', 'notification_worker'];
    if (sqsFunctions.includes(functionName)) {
      baseEnv.SQS_URL = this.queues[`${prefix}notification-queue.fifo`].queueUrl
    }

    const s3Functions = ['requests'];
    if (s3Functions.includes(functionName)) {
      baseEnv.S3_BUCKET_NAME = config.docBucket;
      baseEnv.BUCKET_REGION = config.region;
    }

    return baseEnv;
  }

  getFunctionTimeout(functionName) {
    const longRunningFunctions = [];

    return longRunningFunctions.includes(functionName)
      ? cdk.Duration.seconds(300)
      : cdk.Duration.seconds(60);
  }

  getMemorySize(functionName) {
    const highMemoryFunctions = [];

    return highMemoryFunctions.includes(functionName) ? 512 : 128;
  }

  configureFunctionPermissions(role, functionName, prefix, props) {
    role.addToPolicy(new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: ["secretsmanager:GetSecretValue"],
      resources: [
        `arn:aws:secretsmanager:${props.env.region}:${props.env.account}:secret:${props.env.secret_key}-*`
      ]
    }));

    if (functionName === "requests") {
      role.addToPolicy(new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        actions: ["s3:PutObject", "s3:GetObject", "s3:ListBucket"],
        resources: [
          `arn:aws:s3:::${prefix}*`,
          `arn:aws:s3:::${prefix}*/*`
        ],
      }));

      role.addToPolicy(new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        actions: [
          "sqs:SendMessage",
          "sqs:GetQueueAttributes",
          "sqs:GetQueueUrl"
        ],
        resources: [`arn:aws:sqs:${props.env.region}:${props.env.account}:${props.env.prefix}notification-queue.fifo`],
      }));
    }
  }
}

module.exports = { LambdaStack };
