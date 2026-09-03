const mongose = require('mongoose');

const ProductSchema = new mongose.Schema({

  name: {
    type: String,
    required: true,
    uppercase: true
  },
    description: {
    type: String,
    required: true  
  },
    price: {
    type: Number,
    required: true,
    min: 0
  },
  size: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  stock: {
    type: Number,
    required: true,
    min: 0
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  lotNo: {
    type: String,
    required: true    
  },
  expiryDate: {
    type: Date,
    required: true
  },

},
{timestamps: true}    //date created and updated at fields will be automatically added to the schema

);
//Create a model for the Product schema
const Product = mongose.model('Product', ProductSchema);

module.exports = Product; //export the Product model for use in other parts of the application