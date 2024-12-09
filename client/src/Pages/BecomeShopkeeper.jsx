import React from 'react'
import img from "../assets/two.jpg";
import Register from "../components/Register";
import ShopKeeper from '../components/ShopKeeper';
const BecomeShopkeeper = () => {
  return (
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