const { CloudantV1 } = require('@ibm-cloud/cloudant');
const { IamAuthenticator } = require('ibm-cloud-sdk-core');

// Create the authenticator
let cloudant;

try {
  // If the credentials are not provided yet (since we are doing local dev without a real DB yet),
  // we will handle this gracefully.
  if (process.env.CLOUDANT_URL && process.env.CLOUDANT_API_KEY) {
    const authenticator = new IamAuthenticator({
      apikey: process.env.CLOUDANT_API_KEY,
    });

    // Initialize Cloudant client
    cloudant = new CloudantV1({
      authenticator: authenticator,
    });
    
    cloudant.setServiceUrl(process.env.CLOUDANT_URL);
    console.log('IBM Cloudant client successfully initialized.');
  } else {
    console.warn('⚠️ CLOUDANT_URL or CLOUDANT_API_KEY is missing from .env. Cloudant client is NOT initialized.');
  }
} catch (error) {
  console.error('💥 Failed to initialize IBM Cloudant client:', error);
}

module.exports = cloudant;
