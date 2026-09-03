//ProductController.js
//This file contains the controller functions for handling product-related 
// operations in the Inventory Management System.


//Import the Product model
const Product = require('../Models/Products');

//Create a new product
exports.createProduct = async (req, res) => {
    try {
        if (!req.body.name || !req.body.description || !req.body.price || !req.body.size || !req.body.category || !req.body.stock || !req.body.lotNo || !req.body.expiryDate) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const product = new Product(req.body);
        await product.save();
        res.status(201).json({ message: 'Product created successfully', product });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

//Update a product by ID
exports.updateProduct = async (req, res) => {
    try {
        if (!req.body.name || !req.body.description || !req.body.price || !req.body.size || !req.body.category || !req.body.stock || !req.body.lotNo || !req.body.expiryDate) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const {id} = req.params; //where ID is the product ID  to be updated
        const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Get all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Get a product by ID
exports.getProductById = async (req, res) => {
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
exports.deleteProduct = async (req, res) => {
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

//Export the controller functions
module.exports = {
    createProduct: exports.createProduct,
    getAllProducts: exports.getAllProducts,
    getProductById: exports.getProductById,
    updateProduct: exports.updateProduct,
    deleteProduct: exports.deleteProduct
};

//Note: The above code is a basic implementation of a ProductController in an Express.js application.
//  It includes CRUD operations for managing products in a MongoDB database using Mongoose. 
// Each function handles a specific operation and sends appropriate HTTP responses 
// based on the outcome of the operation.
