import React, { useEffect, useState } from "react";
import PetCard from "../components/PetCard";
import AddPet from "../components/AddPet";
import { useAdoption } from "../context/PetContext";
import axios from "axios";

const ShopkeeperPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [pets, setPets] = useState([]);
  const { user } = useAdoption();

  const fetchpets = async () => {
    if (!user?.token) {
      console.error("User token is missing");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:5000/api/v1/pet/specificpet",
        {
          headers: {
            "Content-Type": "application/json",
            "Auth-Token": user.token,
          },
        }
      );
      if (response.data.success) {
        setPets(response.data.data || []);
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchpets();
  }, []);

  return (
    <div className="auth-page">
      <div className="shop-specific">
        {isLoading ? (
          <h1>Loading...</h1>
        ) : (
          <div className="pet-cards">
            {pets.map((pet) => (
              <PetCard
                key={pet._id}
                data={{
                  name: pet.name,
                  id: pet._id,
                  img: pet.imageUrl,
                }}
              />
            ))}
          </div>
        )}
      </div>
      <AddPet />
    </div>
  );
};

export default ShopkeeperPage;
