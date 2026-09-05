//Upload middleware for handling file uploads to AWS S3
const multer = require('multer'); // Import the multer library for handling multipart/form-data
const multerS3 = require('multer-s3');
const crypto = require('crypto'); // Import the crypto library for generating unique file names
const AWS = require('../Config/s3'); // Import the configured AWS SDK for S3

//Only allow certain file types for upload

const ALLOWED_FILE_TYPES = [
    'image/jpeg', 
    'image/png', 
    'application/pdf']; //Define allowed file types for uploads

const fileFilter = (req, file, cb) => {
    if (ALLOWED_FILE_TYPES.includes(file.mimetype)) {
        cb(null, true); // Accept the file if it is of an allowed type
    } else {
        cb(new Error('Invalid file type'), false); // Reject the file if it is not of an allowed type
    }
};
//crypto.randomBytes(16, (err, raw) => {

// Configure multer to use AWS S3 for file storage
const upload = multer({
    storage: multerS3({
        s3: AWS,
        bucket: process.env.AWS_S3_BUCKET_NAME,
        folder: 'products', // Specify the folder in the S3 bucket where files will be stored
        //acl: 'public-read', // Set the access control for uploaded files to public read

        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            crypto.randomBytes(16, (err, raw) => {
                if (err) return cb(err);
                cb(null, raw.toString('hex') + '-' + file.originalname);
            }); 
        },
        cacheControl: 'max-age=31536000',
    }),
    fileFilter: fileFilter, // Use the defined file filter to validate file types
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB

});

module.exports = upload; // Export the configured multer instance for use in other parts of the application 