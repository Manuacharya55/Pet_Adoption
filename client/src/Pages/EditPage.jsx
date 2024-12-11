import React from 'react'
import img from "../assets/three.jpg";
import EditPet from '../components/EditPet';
const EditPage = () => {
  return (
    <div className="auth-page">
      <div className="image-holder">
        <img src={img} alt="" />
      </div>
      <div className="form-holder">
        <EditPet/>
      </div>
    </div>
  )
}

export default EditPage