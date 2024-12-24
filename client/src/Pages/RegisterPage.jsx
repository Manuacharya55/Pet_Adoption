import React from "react";
import img from "../assets/one.jpg";
import Register from "../components/Register";
import "../styles/auth.css"
import "../styles/generalstyles.css"
const RegisterPage = () => {
  return (
    <div className="auth-page">
      <div className="image-holder">
        <img src={img} alt="" />
      </div>
      <div className="form-holder"  style={{height:"100%",display:"flex",alignItems:"center",justifyContent:"center"}}>
        <Register />
      </div>
    </div>
  );
};

export default RegisterPage;
