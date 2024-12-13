import React from 'react'
import { NavLink } from 'react-router-dom'

const Footer = () => {
  return (
    <nav id='footer'>
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
    </nav>
  )
}

export default Footer