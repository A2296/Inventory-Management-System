const mongose = require('mongoose');
const bcrypt = require('bcryptjs');
const {Timestamp}  = require('mongodb');

const userSchema = new mongose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8 // 'Password must be at least 8 characters long'
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: true
  },
  phone: {
    type: String,
    required: true  
  },
  role: {
    type: String,
    enum: ['superadmin', 'storekeeper', 'salesperson', 'user'],
    default: 'user'
  },

  HasAdminAccess: {
    type: Boolean,
    default: false
  },
  
},
{timestamps: true} // Automatically adds createdAt and updatedAt fields 
);
  
//Create a model for the User schema
const User = mongose.model('User', userSchema);

module.exports = User; //export the User model for use in other parts of the application
