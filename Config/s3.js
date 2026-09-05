//AWS S3 Configuration
const {AWS} = require('@aws-sdk/client-s3'); // Import the AWS S3 client from the AWS SDK
AWS.config({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID, // Set the AWS access key ID from environment variables
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, // Set the AWS secret access key from environment variables
    region: process.env.AWS_REGION // Set the AWS region from environment variables
}); 


module.exports = AWS; // Export the configured AWS SDK for use in other parts of the application