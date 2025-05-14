import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { InfinitySpin } from 'react-loader-spinner';
import axios from "axios";
import { useAdoption } from "../context/PetContext";
import { useSearchParams } from "react-router-dom";
const PetPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [pets, setPets] = useState([]);
  const { user } = useAdoption();

  const [searchParams] = useSearchParams();
  const [species,setSpecies] = useState(searchParams.get("species") || "");
  const [gender,setGender] = useState("");

  const fetchpets = async () => {
    if (!user?.token) {
      console.error("User token is missing");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:5000/api/v1/pet?species=${species}&gender=${gender}`,
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
  }, [species,gender]);


  // if(isLoading) return "loading..."
  return (
    <>
      <div className="banner">
        <h1>Adopt Pets By Category</h1>
      </div>
      {isLoading ? (
        <InfinitySpin
        visible={true}
        width="200"
        color="#37B9F1"
        ariaLabel="infinity-spin-loading"
        />
      ) : (
        <>
          <div className="options">
            <select
              name="species"
              id=""
              onChange={(e) => {
                setIsLoading(true)
               setSpecies(e.target.value);
              }}
              value={species}
            >
              <option value="">All</option>
              <option value="dog">Dog</option>
              <option value="cat">Cat</option>
              <option value="rabbit">Rabbit</option>
              <option value="hamster">Hamster</option>
              <option value="parrot">Parrot</option>
              <option value="lovebird">Lovebird</option>
              <option value="turtle">Turtle</option>
              <option value="tortoise">Tortoise</option>
              <option value="fish">Fish</option>
            </select>

            <select
              name="species"
              id=""
              onChange={(e) => {
                setIsLoading(true)
               setGender(e.target.value);
              }}
              value={gender}
            >
              <option value="">All</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className="container">
            {pets.length > 0 ? (
              pets.map((shop) => (
                <Card
                  key={shop._id}
                  data={{
                    name: shop.name,
                    link: `/pets/${shop._id}`,
                    img: shop.imageUrl,
                  }}
                />
              ))
            ) : (
              <div id="message">
                <h2 id="message">No pets available</h2>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default PetPage;
