import React, { useEffect, useState } from "react";
import MyCalendar from "../components/MyCalendar";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAdoption } from "../context/PetContext";

const CheckOutPage = () => {
  const { user } = useAdoption();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  const [product,setProduct] = useState();
  const fetchData = async () => {
    if (!id || !user) return;

    try {
      const response = await axios.get(
        `http://localhost:5000/api/v1/adopt/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": user.token,
          },
        }
      );
      console.log(response.data.data)
      setProduct({productName:response.data.data.petId.name,category:response.data.data.petId.breed,price:response.data.data.petId.price,_id:response.data.data._id})

      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  return isLoading ? "loading" :(
    <div id="container">
      {/* <div id="image-holder">
        <img
          src="https://img.freepik.com/premium-photo/house-with-black-roof-black-door-that-says-welcome-front_1261459-3805.jpg?ga=GA1.1.264547320.1740062602&semt=ais_hybrid"
          alt=""
        />
      </div> */}
      <div id="check-out">
      <MyCalendar product={product} adoptId={id}/>
      </div>
    </div>
  );
};

export default CheckOutPage;
