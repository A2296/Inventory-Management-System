
const express = require('express');
const router = express.Router(); // Create a router instance for product-related routes

//import the authentication middleware to protect  routes
const {protect} = require('../Middleware/Auth'); // Import the protect middleware to secure routes

//import authorization middleware
const { authorize } = require('../Middleware/Role'); //Import the authorization middleware to check user roles


//Import the product controller 
const productController = require('../Controllers/ProductController');

//Import the upload middleware for handling file uploads
const upload = require('../Middleware/upload');


//Define the routes for product-related operations
router.post('/createproduct', protect, productController.createProduct); // Create a new product 

router.put('/updateproduct/:id', protect, productController.updateProduct); // Update a product by ID

router.get('/getallproducts', protect, productController.getAllProducts); // Get all products

router.get('/getproduct/:id', protect, productController.getProductById); // Get a product by ID

router.delete('/deleteproduct/:id', protect, productController.deleteProduct); // Delete a product by ID

router.post('/uploadproductimage', protect, productController.uploadProductImage); // Upload a product image to the cloud

//Export the router for use in other parts of the application
module.exports = router;

//Note: This file defines the routes for product-related operations in the application. 
// It imports the necessary modules, including Express and the product controller. 
// The router instance is created to handle product-related requests. 
// Each route is defined with its corresponding HTTP method and 
// URL pattern, along with the appropriate controller function to handle the request. 
// Finally, the router is exported for use in other parts of the application.
