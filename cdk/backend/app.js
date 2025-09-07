const cdk = require('aws-cdk-lib');
const fs = require("fs");
const { ApiStack } = require('./cdk/stacks/api-stack');
const { LambdaStack } = require('./cdk/stacks/lambda-stack');
const { SqsStack } = require('./cdk/stacks/sqs-stack');
const settings = require('./config/settings.json');

const env = process.argv[2];

const environmentSettings = settings[env];
if (!environmentSettings) {
  console.error(`Invalid environment: ${env}`);
  process.exit(1);
}

const functionConfig = JSON.parse(
  fs.readFileSync('./config/functions-config.json', 'utf-8')
);

class App extends cdk.App {
  constructor() {
    super();

    const sqsStack = new SqsStack(this, `${environmentSettings.prefix}sqs-stack`, {
      env: environmentSettings,
    });

    const lambdaStack = new LambdaStack(this, `${environmentSettings.prefix}lambda-stack`, {
      queues: sqsStack.queues,
      functionConfig: functionConfig,
      env: environmentSettings,
    });
    lambdaStack.addDependency(sqsStack);

    const apiStack = new ApiStack(this, `${environmentSettings.prefix}api-stack`, { env: environmentSettings, lambdaFunctions: lambdaStack.lambdaFunctions, functionConfig: functionConfig });
    apiStack.addDependency(lambdaStack);
  }
}

new App();
