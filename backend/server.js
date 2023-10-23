const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import the CORS middleware
const {createOrder} = require('./controllers/orderController')
const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for your frontend to make requests to the backend
app.use(cors());

// Use the body parser middleware to parse JSON data
app.use(express.json());

// Connect to MongoDB (using your .env configuration)
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Define the route for creating an order

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

