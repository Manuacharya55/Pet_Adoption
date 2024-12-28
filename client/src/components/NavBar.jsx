import React from "react";
import { useAdoption } from "../context/PetContext";
import { NavLink } from "react-router-dom";
import "../styles/navbar.css";
import logo from "../assets/logo.png";
const NavBar = () => {
  const { isLoggedin, user, logout } = useAdoption();
  return (
    <div className="navbar-holder">
      <nav>
        <img src={logo} alt="" id="logo" />

        <ul>
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
            {user.role !== "shopkeeper" && (
  <li>
    <NavLink to={"/shopkeeper"}>Request</NavLink>
  </li>
)}

            {/* Additional links for shopkeepers */}
            {user.role === "shopkeeper" && (
              <>
                <li>
                  <NavLink to={"/mypets"}>My Pets</NavLink>
                </li>
                <li>
                  <NavLink to={"/adoption"}>Requests</NavLink>
                </li>
                <li>
                  <NavLink to={"/approved"}>Approved</NavLink>
                </li>
                <li>
                  <NavLink to={"/rejected"}>Rejected</NavLink>
                </li>
              </>
            )}
          </>
        </ul>

        {isLoggedin && (
          <button id="logout" onClick={logout}>
            Log out
          </button>
        )}
      </nav>
    </div>
  );
};

export default NavBar;
