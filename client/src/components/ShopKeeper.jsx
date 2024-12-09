import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { useAdoption } from "../context/PetContext";
import { useNavigate } from "react-router-dom";
const ShopKeeper = () => {
    const { setUserToken,token,fetchUserToken } = useAdoption();
    useEffect(()=>{
        fetchUserToken()
    },[token])
    const navigate = useNavigate();
  const [shop, setShop] = useState({
    name: "",
    location: "",
    contactInfo: "",
  });
console.log(token)
  const handleChange = (e) => {
    setShop((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/shop",
        shop,
        {
          headers: {
            "Content-Type": "application/json",
            "Auth-Token" :token
          },
        }
      );

      if (response.data.success) {
        toast.success("Registered as shopkeeper");
        console.log(response.data.data)
        setUserToken(response.data.data.token, response.data.data.user.role);
        navigate("/home")
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <h1>Become A Shopkeeper</h1>
      <input
        type="text"
        placeholder="enter your shop name"
        name="email"
        value={shop.name}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="enter your location"
        name="password"
        value={shop.location}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="enter your contact number"
        name="password"
        value={shop.contactInfo}
        onChange={handleChange}
      />
      <NavLink to={"/home"} style={{float:"left"}}>go to home </NavLink>
      <button type="submit">Become Shopkeeper</button>
    </form>
  );
};

export default ShopKeeper;
