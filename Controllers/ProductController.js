//ProductController.js
//This file contains the controller functions for handling product-related 
// operations in the Inventory Management System.


//Import the Product model
const Product = require('../Models/Products');
const upload = require('../Middleware/upload'); // Import the upload middleware for handling file uploads
const sendEmail = require('../Middleware/Emailsender');
//Create a new product
const createProduct = async (req, res) => {
    try {
        if (!req.body.name || !req.body.description || !req.body.price || !req.body.size || !req.body.category || !req.body.stock || !req.body.lotNo || !req.body.expiryDate) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const product = new Product(req.body);
        await product.save();

        //Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP

        //Send an email notification when a new product is created
        const subject = 'New Product Created';
        const text = `A new product has been created: here is your OTP: ${otp}\n\nName: ${product.name}\nDescription: ${product.description}\nPrice: ${product.price}\nSize: ${product.size}\nCategory: ${product.category}\nStock: ${product.stock}\nLot No: ${product.lotNo}\nExpiry Date: ${product.expiryDate}`;
        await sendEmail(process.env.EMAIL_USER, subject, text);

        res.status(201).json({ message: 'Product created successfully', product });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

//Update a product by ID
const updateProduct = async (req, res) => {
    try {
        if (!req.body.name || !req.body.description || !req.body.price || !req.body.size || !req.body.category || !req.body.stock || !req.body.lotNo || !req.body.expiryDate) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const {id} = req.params; //where ID is the product ID  to be updated
        const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        //Send an email notification when a product is updated
        const subject = 'Product Updated';
        const text = `A product has been updated:\n\nName: ${product.name}\nDescription: ${product.description}\nPrice: ${product.price}\nSize: ${product.size}\nCategory: ${product.category}\nStock: ${product.stock}\nLot No: ${product.lotNo}\nExpiry Date: ${product.expiryDate}`;
        await sendEmail('vanmhute@outlook.com', subject, text);

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Get all products
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Get a product by ID
const getProductById = async (req, res) => {
    try {
        const {id} = req.params; //where ID is the product ID to be retrieved
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


//Delete a product by ID
const deleteProduct = async (req, res) => {
    try {
        const {id} = req.params; //where ID is the product ID to be deleted
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
//Upload product image
const uploadProductImage = async (req, res) => {
    try {

        //const {id} = req.params; //where ID is the product ID to be updated with the image
        upload.array('image', 10)(req, res, async (err) => {
            if (err) {
                return res.status(500).json({message: err.message});
            }

            if (!req.files || req.files.length === 0) {
                return res.status(400).json({message: 'No files uploaded'});
            }

            const imageUrls = req.files.map(file => file.location); //Collect all uploaded file URLs

          //  const product = await Product.findByIdAndUpdate(
          //     id,
          //      { $push: { images: { $each: imageUrls } } }, //Add new images to an existing array
          //      { new: true }
           // );
            
            //if (!product) {
            //    return res.status(404).json({ message: 'Product not found' });
            //}
            res.status(200).json({ message: 'Files uploaded successfully', filePaths: imageUrls });
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//TODO: Implement the uploadProductImage function to handle file uploads and associate them with a product in the database.
//Export the controller functions
module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    uploadProductImage
};

//Note: The above code is a basic implementation of a ProductController in an Express.js application.
//  It includes CRUD operations for managing products in a MongoDB database using Mongoose. 
// Each function handles a specific operation and sends appropriate HTTP responses 
// based on the outcome of the operation.
