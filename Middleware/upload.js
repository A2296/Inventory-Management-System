//Upload middleware for handling file uploads to AWS S3
const multer = require('multer'); // Import the multer library for handling multipart/form-data
const multerS3 = require('multer-s3');
const crypto = require('crypto'); // Import the crypto library for generating unique file names
const AWS = require('../Config/s3'); // Import the configured AWS SDK for S3

//Only allow certain file types for upload
const path = require('path'); // Import the path module for handling file paths
const ALLOWED_FILE_TYPES = [
    'image/jpeg', 
    'image/png',
    'image/jpg', 
    'application/pdf']; //Define allowed file types for uploads

const ALLOWED_EXTENSIONS = ['.jpeg', '.jpg', '.png', '.pdf']; // Define allowed file extensions for uploads


//sanitize the file type to prevent malicious uploads
const sanitizeFileName = (filename) => {
    return filename.replace(/[^a-zA-Z0-9.-]/g, '-'); // Replace any characters that are not alphanumeric, dot, or hyphen with an underscore
}

const fileFilter = (req, file, cb) => {
    console.log('Incoming file type:', file.originalname, file.mimetype); // Temp debug log. Log the incoming file type for debugging purposes
    const ext = path.extname(file.originalname).toLowerCase(); // Get the file extension from the original file name and convert it to lowercase
    const validMine = ALLOWED_FILE_TYPES.includes(file.mimetype); // Check if the file's MIME type is in the list of allowed types
    const validExt = ALLOWED_EXTENSIONS.includes(ext); // Check if the file's extension is in the list of allowed extensions

    if (validMine || validExt) {
        return cb(null, true); 
    } else {
        return cb(new Error('Invalid File Type'), false); // Reject the file if it is not of an allowed type
    }
    
};
//crypto.randomBytes(16, (err, raw) => {

// Configure multer to use AWS S3 for file storage
const storage = multerS3({
        s3: AWS,
        bucket: process.env.AWS_S3_BUCKET_NAME,
        //acl: 'public-read', // Set the access control for uploaded files to public read

        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            crypto.randomBytes(16, (err, raw) => {
                if (err) return cb(err);
                const sanitizedFileName = sanitizeFileName(file.originalname); // Sanitize the original file name
                cb(null, 'products/' + raw.toString('hex') + '-' + sanitizedFileName);
            }); 
        },
        cacheControl: 'max-age=31536000',
    })

    const upload = multer({
        storage: storage,
        fileFilter: fileFilter,
        limits: {fileSize: 5 * 1024 * 1024}, //limit file size to 5MB
    });

module.exports = upload; // Export the configured multer instance for use in other parts of the application 

