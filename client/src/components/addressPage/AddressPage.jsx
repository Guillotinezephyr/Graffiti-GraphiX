import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { submitAddress } from "../../redux/addressSlice";
import classes from "./addressPage.module.css";

const AddressPage = () => {
  const [addressData, setAddressData] = useState({
    country: "",
    state: "",
    city: "",
    email: "",
    phoneNumber: "",
  });
  const [errorMsg, setErrorMsg] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleState = (e) => {
    setAddressData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    // check form
    const isEmpty = Object.values(addressData).some((v) => !v);
    const isFilled = Object.values(addressData).length < 5
    if (isFilled || isEmpty) {
      setErrorMsg((prev) => true);
      setTimeout(() => {
        setErrorMsg((prev) => false);
      }, 2500);
      return;
    }
    dispatch(submitAddress(addressData));
    navigate("/checkout");
  };

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <h1 className={classes.title}>Address and Details</h1>
        <form onSubmit={handleSubmit}>
          <input
            onChange={handleState}
            name="country"
            type="text"
            placeholder="Country..."
          />
          <input
            onChange={handleState}
            name="state"
            type="text"
            placeholder="State..."
          />
          <input
            onChange={handleState}
            name="city"
            type="text"
            placeholder="City..."
          />
          <input
            onChange={handleState}
            name="email"
            type="email"
            value={user?.email}
            placeholder="Email..."
          />
          <input
            onChange={handleState}
            name="phoneNumber"
            type="tel"
            placeholder="Phone number..."
          />
          <button type="submit" className={classes.submitBtn}>
            Submit
          </button>
        </form>
        {errorMsg && <span className={classes.errorMsg}>All fields must filled!</span>}
      </div>
    </div>
  );
};

export default AddressPage;
