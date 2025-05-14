import React from 'react'
import img from "../assets/three.jpg";
import EditPet from '../components/EditPet';
const EditPage = () => {
  return (
    <div className="page">
      <div className="image-holder">
        <img src={img} alt="" />
      </div>
      <div className="container-holder">
        <EditPet/>
      </div>
    </div>
  )
}

export default EditPage