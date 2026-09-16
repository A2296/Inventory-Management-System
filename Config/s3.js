//AWS S3 Configuration
const {S3Client} = require('@aws-sdk/client-s3'); // Import the AWS S3 client from the AWS SDK

const s3 = new S3Client({
    region: process.env.AWS_REGION, // Set the AWS region from environment variables
    credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID, // Set the AWS access key ID from environment variables
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, // Set the AWS secret access key from environment variables
    }
    
}); 

module.exports = s3; // Export the configured S3 client for use in other parts of the application