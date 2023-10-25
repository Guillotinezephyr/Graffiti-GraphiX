import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import classes from "./checkout.module.css";
import { useNavigate } from "react-router-dom";
import {
  emptyCart,
} from "../../redux/cartSlice";

const Checkout = () => {
  const { address } = useSelector((state) => state.address);
  const { products } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();



  function totalPriceProducts() {
    let totalPrice = 0;
    products.map((product) => (totalPrice += product.price * product.quantity));
    return totalPrice.toFixed(2);
  }

  const handleOrder = async () => {
    try {
      console.log(user._id)
      console.log(address)
      const response = await fetch(`http://localhost:5000/orders/create-order`, {
     
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user._id,
          products: products,
          orderPrice: totalPriceProducts(),
          address: address,
        }),
      });
      if(response.status === 201){
        console.log("Order placed successfully!");
        dispatch(emptyCart());
        navigate("/final");

      }
      // Handle success (e.g., show a success message)
      console.log('Order placed successfully!', response.data);
    } catch (error) {
      // Handle errors (e.g., show an error message)
      console.error('Failed to place the order', error);
      alert("Failed to place the order");
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

