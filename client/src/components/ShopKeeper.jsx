import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { useAdoption } from "../context/PetContext";
import { useNavigate } from "react-router-dom";
const ShopKeeper = () => {
  const { user, setUserToken } = useAdoption();
  const navigate = useNavigate();
  const imageRef = useRef();
  const [shop, setShop] = useState({
    name: "",
    location: "",
    contactInfo: "",
    imageUrl: null,
  });
  const handleChange = (e) => {
    setShop((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleImageChange = (e) => {
    const img = imageRef.current.files[0];
    setShop((prev) => {
      return { ...prev, imageUrl:img };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.info("Image is uploading...",{ autoClose: false, toastId: "uploadToast" });
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/shop",
        shop,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Auth-Token": user.token,
          },
        }
      );

      if (response.data.success) {
        toast.dismiss("uploadToast");
        toast.success("Registered as shopkeeper");
        navigate("/login");
      } else {
        toast.dismiss("uploadToast");
        toast.error(response.data.message);
      }
    } catch (error) {
      //console.log(error);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <h1>Become A Shopkeeper</h1>
      <input
        type="text"
        placeholder="enter your shop name"
        name="name"
        value={shop.name}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="enter your location"
        name="location"
        value={shop.location}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="enter your contact number"
        name="contactInfo"
        value={shop.contactInfo}
        onChange={handleChange}
      />
      <input
        type="file"
        name="img"
        id=""
        ref={imageRef}
        onChange={handleImageChange}
      />
      <NavLink to={"/home"} style={{ float: "left" }}>
        go to home{" "}
      </NavLink>
      <button type="submit">Become Shopkeeper</button>
    </form>
  );
};

export default ShopKeeper;
