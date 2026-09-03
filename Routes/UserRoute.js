
const express = require('express');
const router = express.Router(); // Create a router instance for user-related routes

//Import the user controller 
const UserController = require('../Controllers/UserController');

//Define the routes for user-related operations
router.post('/createuser', UserController.createUser); // Create a new user

router.post('/loginuser', UserController.loginUser); // login user

router.put('/updateuser/:id', UserController.updateUser); // Update a user by ID

router.get('/getallusers', UserController.getAllUsers); // Get all users

router.get('/getuser/:id', UserController.getUserById); // Get a user by ID

router.delete('/deleteuser/:id', UserController.deleteUser); // Delete a user by ID

//Export the router for use in other parts of the application
module.exports = router;

//Note: This file defines the routes for user-related operations in the application. 
// It imports the necessary modules, including Express and the user controller. 
// The router instance is created to handle user-related requests. 
// Each route is defined with its corresponding HTTP method and 
// URL pattern, along with the appropriate controller function to handle the request. 
// Finally, the router is exported for use in other parts of the application.
