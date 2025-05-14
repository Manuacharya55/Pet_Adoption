import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { InfinitySpin } from "react-loader-spinner";
import { useAdoption } from "../context/PetContext";
import axios from "axios";
import { toast } from "react-toastify";
const PetDescription = () => {
  const { id } = useParams(); // Extract the pet ID from the route params
  const { user } = useAdoption(); // Get user context
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchPetDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:5000/api/v1/pet/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              "Auth-Token": user.token,
            },
          }
        );
        if (response.data.success) {
          setPet(response.data.data);
          setLoading(false);
        } else {
          setError("Failed to fetch pet details.");
        }
      } catch (err) {
        setError("An error occurred while fetching pet details.");
      } finally {
        setLoading(false);
      }
    };

    fetchPetDetails();
  }, [id, user.token]);

  console.log(pet);
  const handleAddToWishlist = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/v1/auth/${id}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            "Auth-Token": user.token,
          },
        }
      );
      if (response.data.success) {
        toast.success("Pet added to wishlist successfully!");
        console.log(response.data)
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Pet already in wishlist");
    }
  };

  const handleAdoptRequest = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/v1/adopt/${id}`,
        {
          petId: id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Auth-Token": user.token,
          },
        }
      );
      if (response.data.success) {
        toast.success("Adoption request submitted successfully!");
      }
    } catch (error) {
      toast.error("Failed to submit adoption request.");
    }
  };

  if (loading)
    return (
      <InfinitySpin
        visible={true}
        width="200"
        color="#37B9F1"
        ariaLabel="infinity-spin-loading"
      />
    );

  return (
    <>
      {pet && (
        <>
          <div className="banner">
            <h1>{pet.name}</h1>
          </div>

          <div className="pet-details">
            <img src={pet.imageUrl} alt="" />
            <div className="pet-desc">
              <div className="detail-row">
                <h1 className="attribute">Breed : </h1>
                <p className="value">{pet.breed}</p>
              </div>
              <div className="detail-row">
                <h1 className="attribute">Species : </h1>
                <p className="value">{pet.species}</p>
              </div>
              <div className="detail-row">
                <h1 className="attribute">Age : </h1>
                <p className="value">{pet.age}</p>
              </div>
              <div className="detail-row">
                <h1 className="attribute">Gender : </h1>
                <p className="value">{pet.gender}</p>
              </div>
              <div className="detail-row">
                <h1 className="attribute">Description : </h1>
                <p className="value">{pet.description}</p>
              </div>
              <div className="detail-row">
                <h1 className="attribute">Shop Name : </h1>
                <p className="value">{pet.shopId.name}</p>
              </div>
              <div className="detail-row">
                <h1 className="attribute">Location : </h1>
                <p className="value">{pet.shopId.location}</p>
              </div>
              <div className="detail-row">
                <h1 className="attribute">Contact : </h1>
                <p className="value">{pet.shopId.contactInfo}</p>
              </div>

              <div className="btn-col">
                <button onClick={handleAddToWishlist} id="wishlist">
                  Add to Wishlist
                </button>
                <button onClick={handleAdoptRequest} id="adopt">
                  Adopt
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default PetDescription;
