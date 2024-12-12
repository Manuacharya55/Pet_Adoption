import React, { useEffect, useState } from 'react'
import PetCard from '../components/PetCard'
import { useAdoption } from '../context/PetContext';
import axios from 'axios';

function WishListPage() {
  const [isLoading, setIsLoading] = useState(true);
  const { user,pets, setPets } = useAdoption();
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
        <h1>Your Wishlist</h1>
      </div>
      <div className="container">
        {isLoading ? (
          <p>Loading...</p> // More descriptive loading message
        ) : (
          pets.length > 0 ? (
            pets.map((pet) => (
              <PetCard key={pet._id} data={{ name: pet.name, id:pet._id, img: pet.imageUrl,isWishlist:true }} />
            ))
          ) : (
            <div>No pets in your wishlist yet.</div>
          )
        )}
      </div>
    </>
  )
}

export default WishListPage