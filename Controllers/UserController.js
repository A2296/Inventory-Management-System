//UserController.js
//This file contains the controller functions for handling user-related 
// operations in the Inventory Management System.

//Import the User model
const User = require('../Models/Users');

//Import the bcryptjs library for password hashing
const bcrypt = require('bcryptjs');

//Create a new user
exports.createUser = async (req, res) => {
    try {
        //Request body validation: Check if all required fields are provided
        const { 
            name, 
            email, 
            password, 
            gender, 
            phone, 
            role, 
            HasAdminAccess 
        } = req.body;
        
        // Check if all required fields are provided
        if (!name || !email || !password || !gender || !phone ) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        
        //Email check: Check if the email is already registered
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email is already registered' });
        }

        //Phone number check: Check if the phone number is already registered
        const existingPhone = await User.findOne({ phone: req.body.phone });
        if (existingPhone) {
            return res.status(400).json({ message: 'Phone number is already registered' });
        }

        //Encrypt the password before saving the user
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            gender: req.body.gender,
            phone: req.body.phone,
            role: req.body.role || 'user', // Default role is 'user' if not provided
            HasAdminAccess: req.body.HasAdminAccess ||false // Default is false if not provided
        });
        await user.save();
        res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

//Update a user by ID
exports.updateUser = async (req, res) => {
    try {
        // Check if all required fields are provided
        const { name, email, password, gender, phone, role = 'user', HasAdminAccess=false } = req.body;

        // Validate required fields
        if (!name || !email || !password || !gender || !phone || !role || !HasAdminAccess) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        // Encrypt the password before updating the user
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const {id} = req.params; //where ID is the user ID  to be updated

        const user = await User.findByIdAndUpdate(id, { ...req.body, password: hashedPassword }, { new: true });
        // Check if the user exists
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Login a User
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the email and password are provided
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }
        //Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        //Generate a token (you can use JWT or any other)
        //const token = generateToken(user); //Implement your token generation logic here

        const jwt = require('jsonwebtoken');

        const token = jwt.sign({ id: user._id, email: user.email, name: user.name}, process.env.JWT_SECRET, {expiresIn: '1h'});

        // If credentials are correct, send a success response
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Get all users
exports.getAllUsers = async (req, res) => {
    try {
        
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Get a user by ID
exports.getUserById = async (req, res) => {
    try {
        const {id} = req.params; //where ID is the user ID to be retrieved
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


//Delete a user by ID
exports.deleteUser = async (req, res) => {
    try {
        const {id} = req.params; //where ID is the user ID to be deleted
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Export the controller functions
module.exports = {
    createUser: exports.createUser,
    getAllUsers: exports.getAllUsers,
    getUserById: exports.getUserById,
    updateUser: exports.updateUser,
    deleteUser: exports.deleteUser,
    loginUser: exports.loginUser
};

//Note: The above code is a basic implementation of a UserController in an Express.js application.
//  It includes CRUD operations for managing users in a MongoDB database using Mongoose. 
// Each function handles a specific operation and sends appropriate HTTP responses 
// based on the outcome of the operation.
