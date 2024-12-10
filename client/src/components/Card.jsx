import React from 'react'
import { NavLink } from 'react-router-dom'

const Card = ({data}) => {
  const {img,name,link} = data
  return (
    <div className="card">
        <img src={img} alt="" />

        <div className="details">
          <h3>{name}</h3>
            <NavLink to={link}>More Details</NavLink>
        </div>
    </div>
  )
}

export default Card