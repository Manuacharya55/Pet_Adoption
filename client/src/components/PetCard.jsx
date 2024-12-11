import axios from "axios";
import React from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { useAdoption } from "../context/PetContext";
const PetCard = ({ data }) => {
  const { img, name, id } = data;
  const { user } = useAdoption();
  return (
    <div className="shop-pet-card">
      <img src={img} alt="" />

      <div className="details">
        <h3>{name}</h3>
        <div className="btn-col">
          <NavLink to={`/editpet/${id}`} id="edit">
            edit
          </NavLink>
          <button
            id="delete"
            onClick={async (e) => {
              e.preventDefault();
              try {
                const response = await axios.delete(
                  `http://localhost:5000/api/v1/pet/${id}`,
                  {
                    headers: {
                      "Content-Type": "application/json",
                      "Auth-Token": user.token,
                    },
                  }
                );
                if (response.data.success) {
                  toast.success("Pet deleted successfully");
                } else {
                  toast.error("Failed to delete pet");
                }
              } catch (error) {
                toast.error(error.message);
              }
            }}
          >
            delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default PetCard;
