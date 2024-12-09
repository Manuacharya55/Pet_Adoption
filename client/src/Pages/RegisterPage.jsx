import React from "react";
import img from "../assets/one.jpg";
import Register from "../components/Register";
const RegisterPage = () => {
  return (
    <div className="auth-page">
      <div className="image-holder">
        <img src={img} alt="" />
      </div>
      <div className="form-holder">
        <Register />
      </div>
    </div>
  );
};

export default RegisterPage;
