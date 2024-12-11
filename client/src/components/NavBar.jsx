import React from "react";
import { useAdoption } from "../context/PetContext";
import { NavLink } from "react-router-dom";
import "../styles/navbar.css";
import logo from "../assets/logo.png";
const NavBar = () => {
  const { isLoggedin, user } = useAdoption();
  return (
    <div className="navbar-holder">
      <nav>
        <img src={logo} alt="" id="logo" />

        <ul>
          {user.role === "user" && (
            <>
              <li>
                <NavLink to={"/home"}>Home</NavLink>
              </li>
              <li>
                <NavLink to={"/shops"}>Shops</NavLink>
              </li>
              <li>
                <NavLink to={"/pets"}>Pets</NavLink>
              </li>
              <li>
                <NavLink to={"/wishlist"}>Wishlist</NavLink>
              </li>
              <li>
                <NavLink to={"/shopkeeper"}>Request</NavLink>
              </li>
            </>
          )}
          {user.role === "shopkeeper" && (
            <>
              
              <li>
                <NavLink to={"/mypets"}>mypets</NavLink>
              </li>
              <li>
                <NavLink to={"/adoption"}>requests</NavLink>
              </li>
              <li>
                <NavLink to={"/approved"}>aproved</NavLink>
              </li>

              <li>
                <NavLink to={"/rejected"}>rejected</NavLink>
              </li>
              <li>
                <NavLink to={"/shops"}>Shops</NavLink>
              </li>
            </>
          )}
        </ul>

        {isLoggedin && <button id="logout">Log out</button>}
      </nav>
    </div>
  );
};

export default NavBar;
