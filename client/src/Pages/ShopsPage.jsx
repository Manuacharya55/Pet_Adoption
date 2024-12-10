import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import axios from "axios";
import { useAdoption } from "../context/PetContext";
import ShimmerLoadingPage from "./ShimmerLoadingPage";

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
    <div className="container">
      <h1>Adopt Pets By Shop</h1>
      {isLoading ? (
        <ShimmerLoadingPage />
      ) : (
        <div className="shops-holder">
          {shops.length > 0 ? (
            shops.map((shop) => <Card key={shop._id} data={
              {
                name: shop.name,
                link: `/shops/${shop._id}`,
                img: "https://img.freepik.com/free-photo/3d-illustration-showcasing-friendship-cats-dogs_23-2151483371.jpg?uid=R95440870&ga=GA1.1.1474846998.1733319499&semt=ais_hybrid"
              }
            } />)
          ) : (
            <div>No shops available</div>
          )}
        </div>
      )}
    </div>
  );
};

export default ShopsPage;
