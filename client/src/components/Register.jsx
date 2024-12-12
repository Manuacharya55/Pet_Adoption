import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
const Register = () => {
  const [register, setRegister] = useState({
    name: "",
    email: "",
    password: "",
  });

const handleChange =(e) =>{
setRegister((prev)=>{
    return {...prev,[e.target.name]: e.target.value}
});
}

const handleSubmit = async(e) => {
  e.preventDefault();
 try {
    const response = await axios.post("http://localhost:5000/api/v1/auth/register",register,{
        headers: {
          "Content-Type": "application/json",
        }
      })
    
      if(response.data.success){
        toast.success("Registration Successful")
        //console.log(response.data)
      }else{
        toast.error(response.data.message)
      }
 } catch (error) {
    //console.log(error)
 }
}
  return (
    <form onSubmit={handleSubmit}>
      <h1>Register your account</h1>
      <input type="text" placeholder="enter your full name" name="name" value={register.name} onChange={handleChange}/>
      <input type="text" placeholder="enter your email" name="email" value={register.email} onChange={handleChange}/>
      <input type="text" placeholder="enter your password" name="password" value={register.password} onChange={handleChange}/>
      <NavLink to={"/login"}>already have an account ? </NavLink>
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
