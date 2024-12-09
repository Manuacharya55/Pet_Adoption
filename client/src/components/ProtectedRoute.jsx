import React from "react";
import { Outlet } from "react-router-dom";
import { useAdoption } from "../context/PetContext";
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";
const ProtectedRoute = () => {
  const {isLoggedIn} = useAdoption();
  const navigate = useNavigate();
  return isLoggedIn && <><NavBar/> <Outlet /></>
};

export default ProtectedRoute;
