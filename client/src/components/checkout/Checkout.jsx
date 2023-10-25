import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import classes from "./checkout.module.css";
import axios from "axios";

const Checkout = () => {
  const { address } = useSelector((state) => state.address);
  const { products } = useSelector((state) => state.cart);

  function totalPriceProducts() {
    let totalPrice = 0;
    products.map((product) => (totalPrice += product.price * product.quantity));
    return totalPrice.toFixed(2);
  }

  const handleOrder = async () => {
    try {
      const response = await axios.post('http://localhost:5000/controllers/orderControlller', {
        products: products, // Assuming you have an array of products
        address: address,
      });
      // Handle success (e.g., show a success message)
      console.log('Order placed successfully!', response.data);
    } catch (error) {
      // Handle errors (e.g., show an error message)
      console.error('Failed to place the order', error);
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.top}>
          <h1 className={classes.title}>Address Data</h1>
          <div className={classes.addressData}>
            {Object.entries(address).map(([key, value]) => (
              <div className={classes.info} key={key}>
                <h3>{key}: </h3>
                <span>{value}</span>
              </div>
            ))}
          </div>
        </div>
        <div className={classes.bottom}>
          <h1 className={classes.title}>Products</h1>
          <div className={classes.products}>
            {products.map((product) => (
              <div key={product.id} className={classes.product}>
                <Link to={`/productDetail/${product.id}`}>
                  <img
                    src={`http://localhost:5000/images/${product?.mainImg}`}
                    className={classes.img}
                    alt=""
                  />
                </Link>
                <div className={classes.priceAndTitle}>
                  <p className={classes.productTitle}>{product.title}</p>
                  <span className={classes.price}>
                    {product.quantity} x <span>₹</span> {product.price}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <span className={classes.totalPriceMsg}>
            Total price of products:{" "}
            <div className={classes.totalPrice}>₹{totalPriceProducts()}</div>
          </span>
        </div>
        <button onClick={handleOrder} className={classes.orderBtn}>
         Order
         </button>

      </div>
    </div>
  );
};

export default Checkout;

