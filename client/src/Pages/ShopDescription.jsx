import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink, useParams } from "react-router-dom";
import Card from "../components/Card"; // Assuming Card component is already created
import { useAdoption } from "../context/PetContext";
// import "./ShopDescription.css"; // Import the CSS file

const ShopDescription = () => {
  const { id } = useParams(); // Get shop ID from route params
  const {user} = useAdoption();
  const [shop, setShop] = useState(null);
  const [pets, setPets] = useState([]);

  const fetchShop = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/v1/shop/${id}`, {
        headers: {
          "Content-Type": "application/json",
          "Auth-Token": user.token, // Replace `user.token` with the actual token variable
        },
      });

      if (response.data.success) {
        setShop(response.data.data.shop);
        setPets(response.data.data.pets);
      }
    } catch (error) {
      console.error("Error fetching shop data:", error);
    }
  };

  useEffect(() => {
    fetchShop();
  }, [id]);

  return (
    <div className="shop-container">
      {shop ? (
        <div className="shop-details">
          <img src={shop.imageUrl} alt={shop.name} className="shop-image" />
          <div className="shop-info">
            <h1>{shop.name}</h1>
            <p><strong>Location:</strong> {shop.location}</p>
            <p><strong>Contact:</strong> {shop.contactInfo}</p>
            <p><strong>Created At:</strong> {new Date(shop.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      ) : (
        <p>Loading shop details...</p>
      )}

      <div className="pets-section">
        <h2>Available Pets</h2>
        <div className="shops-holder">
          {pets.length > 0 ? (
            pets.map((pet) => (
              <Card
                key={pet._id}
                data={{
                  img: pet.imageUrl,
                  name: pet.name,
                  link: `/pets/${pet._id}`,
                }}
              />
            ))
          ) : (
            <p>No pets available at the moment.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopDescription;
