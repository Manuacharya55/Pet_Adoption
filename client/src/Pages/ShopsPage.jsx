import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import axios from "axios";
import { useAdoption } from "../context/PetContext";

const ShopsPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [shops, setShops] = useState([]);
  const { user } = useAdoption();

  const fetchShops = async () => {
    if (!user?.token) {
      console.error("User token is missing");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:5000/api/v1/shop?page=1&limit=20",
        {
          headers: {
            "Content-Type": "application/json",
            "Auth-Token": user.token,
          },
        }
      );
      if (response.data.success) {
        setShops(response.data.data || []);
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchShops();
  }, []);

  return (
    <>
      <div className="banner">
        <h1>Adopt Pets By Shop</h1>
      </div>
      {isLoading ? (
"Loading"
      ) : (
        <div className="container">
          {shops.length > 0 ? (
            shops.map((shop) => (
              <Card
                key={shop._id}
                data={{
                  name: shop.name,
                  link: `/shops/${shop._id}`,
                  img: shop.imageUrl,
                }}
              />
            ))
          ) : (
            <div id="message">
                <h2 id="message">No shops available</h2 >
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ShopsPage;
