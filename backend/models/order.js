const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  products: [
    {
      productId: { 
        type: mongoose.Types.ObjectId,
        ref: "Product"
      },
      quantity: {
        type: Number
      },
    }
  ],
  user:{
    type: mongoose.Types.ObjectId,
    ref: "User"
  },
  address: {
    country: String,
    state: String,
    city: String,
    phoneNumber: String,
  },
  orderPrice:{
    type:Number
  }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
