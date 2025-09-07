const { Stack } = require('aws-cdk-lib');

const sqs = require('aws-cdk-lib/aws-sqs');

const fs = require('fs');

const path = require('path');

const cdk = require('aws-cdk-lib');

const iam = require('aws-cdk-lib/aws-iam');
 
class SqsStack extends Stack {

  constructor(scope, id, props) {

    super(scope, id, props);
 
    this.queues = {};
 
    const prefix = props.env.prefix;

    const configPath = path.join(__dirname, '../../config/sqs-config.json');

    const queuesConfig = JSON.parse(fs.readFileSync(configPath, 'utf8'));
 
    queuesConfig.forEach(queueConfig => {

      const queueNameWithPrefix = `${prefix}${queueConfig.name}`;
 
      const queue = new sqs.Queue(this, queueNameWithPrefix, {
        queueName: queueNameWithPrefix,
        fifo: queueConfig.fifo || true,
        visibilityTimeout: cdk.Duration.seconds(queueConfig.visibilityTimeout),
        retentionPeriod: cdk.Duration.days(queueConfig.retentionPeriod),
      });
 
      
 
      this.queues[queueNameWithPrefix] = queue;  
 
      queue.addToResourcePolicy(new iam.PolicyStatement({

        effect: iam.Effect.ALLOW,

        principals: [new iam.ServicePrincipal('events.amazonaws.com')],

        actions: ['sqs:SendMessage'],

        resources: [queue.queueArn],

      }));
 
      new cdk.CfnOutput(this, `${queueNameWithPrefix}Url`, {

        value: queue.queueUrl,

      });

    });

  }

}
 
module.exports = { SqsStack };
 