import React from 'react'
import { NavLink } from 'react-router-dom'

const Card = () => {
  return (
    <div className="card">
        <img src="https://img.freepik.com/free-photo/3d-illustration-showcasing-friendship-cats-dogs_23-2151483371.jpg?uid=R95440870&ga=GA1.1.1474846998.1733319499&semt=ais_hybrid" alt="" />

        <div className="details">
            <NavLink to={"/"}>More Details</NavLink>
        </div>
    </div>
  )
}

export default Card