
const express = require('express');
const router = express.Router(); // Create a router instance for user-related routes
//import the authentication middleware to protect  routes
const {protect} = require('../Middleware/Auth'); // Import the protect middleware to secure routes
//import authorization middleware
const { authorize } = require('../Middleware/Role'); //Import the authorization middleware to check user roles

//Import the user controller 
const UserController = require('../Controllers/UserController');

//Define the routes for user-related operations
router.post('/createuser', protect, authorize('superadmin'), UserController.createUser); // Create a new user

router.post('/loginuser', UserController.loginUser); // login user

router.put('/updateuser/:id', protect, authorize('superadmin'), UserController.updateUser); // Update a user by ID

router.get('/getallusers', protect, authorize('superadmin', 'storekeeper'), UserController.getAllUsers); // Get all users

router.get('/getuser/:id', protect,  authorize('superadmin', 'storekeeper'), UserController.getUserById); // Get a user by ID

router.delete('/deleteuser/:id', protect, authorize('superadmin'),  UserController.deleteUser); // Delete a user by ID

//Export the router for use in other parts of the application
module.exports = router;

//Note: This file defines the routes for user-related operations in the application. 
// It imports the necessary modules, including Express and the user controller. 
// The router instance is created to handle user-related requests. 
// Each route is defined with its corresponding HTTP method and 
// URL pattern, along with the appropriate controller function to handle the request. 
// Finally, the router is exported for use in other parts of the application.
