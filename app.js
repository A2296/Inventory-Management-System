// app.js
//Import required modules
//Import the express module to create an Express application
//Import the product route to handle product-related requests
//Import the user route to handle user-related requests
//Import the database connection configuration to connect to the MongoDB database
//Create an instance of the Express application
//Use middleware to parse JSON request bodies
//Use the product route for handling product-related requests
//Use the user route for handling user-related requests


const express = require('express');
const productRoute = require('./Routes/ProductRoute'); //Import the product route
const userRoute = require('./Routes/UserRoute'); //Import the user route
//const invoiceRoute = require('./Routes/InvoiceRoute'); //Import the invoice route 

const dotenv = require('dotenv');

const connectDB = require('./Config/databaseConfig'); //Import the database connection configuration

const app = express();
dotenv.config(); //Load environment variables from the .env file

//Connect to the MongoDB database
connectDB(); //Call the connectDB function to establish a connection to the MongoDB database

const PORT = process.env.PORT; //Set the port for the server to listen on


// Middleware to parse JSON request bodies
app.use(express.json()); 

// Use the product route
app.use('/products', productRoute); //use the product route for all requests starting with /products

app.use('/users', userRoute); ////use the user route for all requests starting with /users
  
//app.use('/invoices', invoiceRoute); //use the invoice route for all requests starting with /invoices

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

