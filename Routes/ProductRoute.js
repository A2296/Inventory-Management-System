
const express = require('express');
const router = express.Router(); // Create a router instance for product-related routes

//import the authentication middleware to protect  routes
const {protect} = require('../Middleware/Auth'); // Import the protect middleware to secure routes

//import authorization middleware
const { authorize } = require('../Middleware/Role'); //Import the authorization middleware to check user roles


//Import the product controller 
const productController = require('../Controllers/ProductController');


//Define the routes for product-related operations
router.post('/createproduct', protect, authorize('superadmin'), productController.createProduct); // Create a new product 

router.put('/updateproduct/:id', protect, authorize('superadmin', 'storekeeper'), productController.updateProduct); // Update a product by ID

router.get('/getallproducts', protect, authorize('superadmin', 'storekeeper', 'salesperson'), productController.getAllProducts); // Get all products

router.get('/getproduct/:id', protect, authorize('superadmin', 'storekeeper', 'salesperson'), productController.getProductById); // Get a product by ID

router.delete('/deleteproduct/:id', protect, authorize('superadmin'), productController.deleteProduct); // Delete a product by ID

//Export the router for use in other parts of the application
module.exports = router;

//Note: This file defines the routes for product-related operations in the application. 
// It imports the necessary modules, including Express and the product controller. 
// The router instance is created to handle product-related requests. 
// Each route is defined with its corresponding HTTP method and 
// URL pattern, along with the appropriate controller function to handle the request. 
// Finally, the router is exported for use in other parts of the application.
