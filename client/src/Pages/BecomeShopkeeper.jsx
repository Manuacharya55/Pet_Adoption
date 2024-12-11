import React from 'react'
import img from "../assets/two.jpg";
import Register from "../components/Register";
import ShopKeeper from '../components/ShopKeeper';
import { useAdoption } from '../context/PetContext';
import { Navigate } from 'react-router-dom';
const BecomeShopkeeper = () => {
  const {user} = useAdoption()
  return  user.role === "shopkeeper"? <Navigate to="/mypets"/> :(
    <div className="auth-page">
      <div className="image-holder">
        <img src={img} alt="" />
      </div>
      <div className="form-holder">
        <ShopKeeper />
      </div>
    </div>
  )
}

export default BecomeShopkeeper