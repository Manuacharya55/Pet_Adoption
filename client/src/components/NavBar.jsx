import React from "react";
import { useAdoption } from "../context/PetContext";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  const { isLoggedin } = useAdoption();
  return (
    <nav>
      <h1>Pet Adoption</h1>

      <ul>
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
          <NavLink to={"/request"}>Request</NavLink>
        </li>
      </ul>

      {isLoggedin && <button id="logout">Log out</button>}
    </nav>
  );
};

export default NavBar;
