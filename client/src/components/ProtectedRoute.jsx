import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAdoption } from "../context/PetContext";
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";
const ProtectedRoute = () => {
  const {isLoggedin} = useAdoption();
  console.log(isLoggedin)
  const navigate = useNavigate();
  return isLoggedin ? <Outlet/> : <Navigate to="/login" />
};

export default ProtectedRoute;
