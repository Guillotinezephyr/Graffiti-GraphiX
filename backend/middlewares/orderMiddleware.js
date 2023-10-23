// orderMiddleware.js

// Import any necessary modules or dependencies
const express = require('express');
const router = express.Router(); // Create an Express Router for order-related routes
const Order = require('../models/order'); // Import your Order model (assuming you have one)

// Middleware to validate order data
function validateOrderData(req, res, next) {
  // Add your validation logic here
  const { products, address, user_id } = req.body;

  // Example validation: Check if products and address are provided
  if (!products || !address || !user_id) {
    return res.status(400).json({ error: 'Invalid order data' });
  }

  // Proceed to the next middleware or route handler
  next();
}

// Middleware to create an order
async function createOrder(req, res) {
  try {
    const { products, address } = req.body;
    // Perform database operations to save the order data using your Order model
    const order = new Order({
      products,
      address,
    });
    await order.save();

    res.status(201).json({ message: 'Order created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create the order' });
  }
}

// Export the middleware functions
module.exports = {
  validateOrderData,
  createOrder,
};
