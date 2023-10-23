const Order = require('../models/order');
const User = require('../models/User');
const Product = require("../models/Product");
const orderController = require("express").Router();
const {validateOrderData} = require('../middlewares/orderMiddleware')
const createOrder = async (req, res) => {

  const { products, address, user_id, orderPrice } = req.body;
  console.log(products)
  try {
    // const user = await User.findById(user_id);
    // for(const product of products){
    //   console.log(product.productId)
    //   const existing_product = await Product.findById(product.productId);
    //   if(!existing_product){
    //     res.status(404).json({message: "No product found"})
    //   }
      
    // }
    const newOrder = await Order.create({
      products: products,
      address: address,
      user: user_id,
      orderPrice: orderPrice
    })
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create order' });
  }
};

const getAllOrders = async(req,res) => {
  try{
    const orders = await Order.find({});
    res.status(200).json(orders)
  }catch(e){
    console.log(e)
  }
}

const getOrderOfRespCustomer = async (req,res) => {
  const user = req.params.id;
  const existing_user = await User.findById(user);
  if(!existing_user){
    res.status(404).json({message: "NO user found"});
  }
  const orders = await Order.find({user: existing_user._id});
  const orderList = [];
  for(const order of orders){
    for(const producty of order.products){
      const product = await Product.findById(producty.productId);
      orderList.push({
        productOrdered:{
          name: product.title,
          firstImg: product.firstImg,
          secondImg: product.secondImg,
          desc: product.desc
        },
        quantity: producty.quantity,
        address: order.address
      })
    }
    orderList.push({
      orderPrice: order.orderPrice
    })
  }

  res.status(200).json(orderList)  
}



orderController.post('/create-order', createOrder);
orderController.get('/get-all-orders', getAllOrders)
orderController.get('/:id',getOrderOfRespCustomer)

module.exports = {
  orderController
};
