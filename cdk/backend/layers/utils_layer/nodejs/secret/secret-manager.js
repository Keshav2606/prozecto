const AWS = require('aws-sdk');

const secretName = process.env.SECRET_KEY;
const region = 'ap-south-1';

const client = new AWS.SecretsManager({ region });

async function getSecretKey(secretKeyName) {
  console.log(`[SecretsManager] Requested key: "${secretKeyName}"`);
  console.log(`[SecretsManager] Fetching secret from AWS Secrets Manager with SecretId: "${secretName}"`);

  try {
    const data = await client.getSecretValue({ SecretId: secretName }).promise();
    console.log(`[SecretsManager] Raw response received from AWS Secrets Manager.`);

    if ('SecretString' in data) {
      const secretObject = JSON.parse(data.SecretString);
      console.log(`[SecretsManager] Successfully parsed secret string.`);

      if (secretObject[secretKeyName]) {
        console.log(`[SecretsManager] Found key "${secretKeyName}" in secret.`);
        return secretObject[secretKeyName];
      } else {
        console.warn(`[SecretsManager] Key "${secretKeyName}" not found in secret object.`);
        throw new Error(`Key "${secretKeyName}" not found in Secrets Manager secret`);
      }

    } else {
      console.error(`[SecretsManager] SecretString not found in Secrets Manager response.`);
      throw new Error('SecretString not found in Secrets Manager response');
    }

  } catch (err) {
    console.error(`[SecretsManager] Failed to retrieve secret "${secretKeyName}":`, err);
    throw err;
  }
}

module.exports = { getSecretKey };
