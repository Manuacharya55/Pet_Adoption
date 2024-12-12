import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { useAdoption } from "../context/PetContext";
import { useShopKeeper } from "../context/ShopKeeperContext";
import HandleRequest from "./HandleRequest";

const PetCard = ({ data }) => {
  const { img, name, id, isWishlist } = data;
  const { dispatch } = useShopKeeper();
  const { user,setPets } = useAdoption();

  const handleDelete = async (e) => {
    e.preventDefault();
    const response = await HandleRequest({
      method: "delete",
      token: user.token,
      url: `pet/${id}`,
      onSuccess: "Pet deleted successfully",
      onError: "Failed to delete pet",
    });

    if (response) {
      dispatch({ type: "REMOVE", payload: id });
    }
  };

  const removeFromWishlist = async (e) => {
    e.preventDefault();
    const response = await HandleRequest({
      method: "delete",
      token: user.token,
      url: `auth/${id}`,
      onSuccess: "Removed from wishlist",
      onError: "Failed to remove from wishlist",
    });
    if (response) {
      toast.success("removed from wishlist");
      setPets((prevPets) => prevPets.filter((pet) => pet._id!== id));
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
