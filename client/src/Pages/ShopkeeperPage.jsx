import React, { useEffect, useState } from "react";
import PetCard from "../components/PetCard";
import AddPet from "../components/AddPet";
import { useAdoption } from "../context/PetContext";
import axios from "axios";
import { useShopKeeper } from "../context/ShopKeeperContext";

const ShopkeeperPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [pets, setPets] = useState([]);
  const { user } = useAdoption();
  const { state, dispatch } = useShopKeeper();
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
        dispatch({type:"LOAD",payload:response.data.data})
        setIsLoading(false);
        console.log(state)
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchpets();
    
  }, []);

  return (
    <>
      <div className="banner">
        <h1>Welcome to dashboard</h1>
      </div>
      <div className="container grid">
        <div className="shop-specific">
          {isLoading ? (
            <h1>Loading...</h1>
          ) : (
            <div className="pet-cards">
              {state.map((pet) => (
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
    </>
  );
};

export default ShopkeeperPage;
