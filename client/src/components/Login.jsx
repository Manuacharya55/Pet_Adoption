import axios from "axios";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { useAdoption } from "../context/PetContext";
import { useNavigate } from "react-router-dom";
const Login = () => {
    const { setUserToken } = useAdoption();
    const navigate = useNavigate();
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setLogin((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/auth/login",
        login,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        toast.success("log in Successful");
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
      <h1>Login</h1>
      <input
        type="text"
        placeholder="enter your email"
        name="email"
        value={login.email}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="enter your password"
        name="password"
        value={login.password}
        onChange={handleChange}
      />
      <NavLink to={"/register"}>don't have an account ? </NavLink>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
