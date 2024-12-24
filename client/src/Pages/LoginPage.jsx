import React from 'react'
import Login from '../components/Login'
import img from "../assets/three.jpg";
const LoginPage = () => {
  return (
    <div className="auth-page">
      <div className="image-holder">
        <img src={img} alt="" />
      </div>
      <div className="form-holder" style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
        <Login />
      </div>
    </div>
  )
}

export default LoginPage