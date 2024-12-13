import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { useAdoption } from "../context/PetContext";
import { useShopKeeper } from "../context/ShopKeeperContext";
import HandleRequest from "./HandleRequest";
import axios from "axios";

const PetCard = ({ data }) => {
  const { img, name, id, isWishlist } = data;
  const { dispatch } = useShopKeeper();
  const { user, setPets } = useAdoption();

  const handleDelete = async (e) => {
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
        dispatch({ type: "REMOVE", payload: id });
      } else {
        toast.error("Failed to delete pet");
      }
    } catch (error) {
      toast.error(error.message || "An error occurred while deleting the pet");
    }
  };

  const removeFromWishlist = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.delete(
        `http://localhost:5000/api/v1/auth/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            "Auth-Token": user.token,
          },
        }
      );

      if (response.data.success) {
        toast.success("Removed from wishlist");
        setPets((prevPets) => prevPets.filter((pet) => pet._id !== id));
      } else {
        toast.error("Failed to remove from wishlist");
      }
    } catch (error) {
      toast.error(
        error.message || "An error occurred while removing from wishlist"
      );
    }
  };

  return (
    <div className="shop-pet-card">
      <img src={img} alt="" />

      <div className="details">
        <h3>{name}</h3>
        <div className="btn-col">
          {isWishlist ? (
            <button id="wishlist" onClick={removeFromWishlist}>
              remove
            </button>
          ) : (
            <>
              <NavLink to={`/editpet/${id}`} id="edit">
                edit
              </NavLink>
              <button id="delete" onClick={handleDelete}>
                delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PetCard;
