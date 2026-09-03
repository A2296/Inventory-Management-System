
const express = require('express');
const router = express.Router(); // Create a router instance for product-related routes

//Import the product controller 
const productController = require('../Controllers/ProductController');

//Define the routes for product-related operations
router.post('/createproduct', productController.createProduct); // Create a new product 

router.put('/updateproduct/:id', productController.updateProduct); // Update a product by ID

router.get('/getallproducts', productController.getAllProducts); // Get all products

router.get('/getproduct/:id', productController.getProductById); // Get a product by ID

router.delete('/deleteproduct/:id', productController.deleteProduct); // Delete a product by ID

//Export the router for use in other parts of the application
module.exports = router;

//Note: This file defines the routes for product-related operations in the application. 
// It imports the necessary modules, including Express and the product controller. 
// The router instance is created to handle product-related requests. 
// Each route is defined with its corresponding HTTP method and 
// URL pattern, along with the appropriate controller function to handle the request. 
// Finally, the router is exported for use in other parts of the application.
