import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import axios from "axios";
import { useAdoption } from "../context/PetContext";
const PetPage = () => {
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
        "http://localhost:5000/api/v1/pet?limit=15&page=1",
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
  }, [])
  return (
    <>
    <div className="banner">
      <h1>Adopt Pets By Shop</h1>
    </div>
      {isLoading ? (
       "Loading"
      ) : (
        <div className="container">
          {pets.length > 0 ? (
            pets.map((shop) => <Card key={shop._id} data={
              {
                name: shop.name,
                link: `/pets/${shop._id}`,
                img: shop.imageUrl
              }
            } />)
          ) : (
            <div>No pets available</div>
          )}
          
        </div>
      )}
    </>
  );
}

export default PetPage