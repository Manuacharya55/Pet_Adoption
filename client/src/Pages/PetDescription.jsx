import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { InfinitySpin } from 'react-loader-spinner';
import { useAdoption } from "../context/PetContext";
import axios from "axios";
import {toast} from "react-toastify";

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

  const handleAddToWishlist = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/v1/auth/${id}`,{},
        {
          headers: {
            "Content-Type": "application/json",
            "Auth-Token": user.token,
          },
        }
      );
      if (response.data.success) {
        toast.success("Pet added to wishlist successfully!");
      }else{
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

  if(loading) return ( <InfinitySpin
    visible={true}
    width="200"
    color="#37B9F1"
    ariaLabel="infinity-spin-loading"
    />)

  return (
    <>
      {pet && (
        <>
          <div className="banner">
            <h1>{pet.name}</h1>
          </div>
          <div className="banner-image">
            <img src={pet.imageUrl} alt={pet.name} className="pet-image" />
          </div>
          <div className="banner-details banner-column">
            <div className="column">
              <p>
                <strong>Breed:</strong> {pet.breed}
              </p>
              <p>
                <strong>Species:</strong> {pet.species}
              </p>
              <p>
                <strong>Age:</strong> {pet.age} years
              </p>
            </div>
            <p>{pet.description}</p>
            <h1 className="pet-price">Price: ${pet.price}</h1>
            <div className="btn-col">
              <button onClick={handleAddToWishlist} id="wishlist">
                Add to Wishlist
              </button>
              <button onClick={handleAdoptRequest} id="adopt">
                Adopt
              </button>
            </div>
          </div>
          <div className="banner-details">
            <img
              src={pet.shopId.imageUrl}
              alt={pet.shopId.name}
              className="shop-logo"
            />
            <p>
              <strong>Shop Name:</strong> {pet.shopId.name}
            </p>
            <p>
              <strong>Location:</strong> {pet.shopId.location}
            </p>
            <p>
              <strong>Contact:</strong>{" "}
              <NavLink to={pet.shopId.contactInfo}>
                {pet.shopId.contactInfo}
              </NavLink>
            </p>
          </div>
        </>
      )}
    </>
  );
};

export default PetDescription;
