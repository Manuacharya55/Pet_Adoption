import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAdoption } from "../context/PetContext";
import { toast } from "react-toastify";
import axios from "axios";

const EditPet = () => {
  const { id } = useParams(); // Get the pet ID from route parameters
  const { user } = useAdoption();
  const navigate = useNavigate();
  const imageRef = useRef();
  const [pet, setPet] = useState({
    name: "",
    species: "",
    breed: "",
    age: 0,
    description: "",
    imageUrl: "",
    price: 0,
  });

  const fetchPet = async () => {
    const response = await HandleRequest({
      method: "get",
      token: user.token,
      url: `pet/${id}`,
      onSuccess: "",
      onError: "Failed to delete pet",
    });

    if (response) {
      setPet(response.data.data);
    }
  };

  useEffect(() => {
    fetchPet();
  }, [id, user.token]);

  const handleChange = (e) => {
    setPet((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = () => {
    const img = imageRef.current.files[0];
    setPet((prev) => ({ ...prev, imageUrl: img }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.info("Updating pet details...", {
      autoClose: false,
      toastId: "updateToast",
    });

    try {

      const response = await axios.patch(
        `http://localhost:5000/api/v1/pet/${id}`,
        pet,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Auth-Token": user.token,
          },
        }
      );

      if (response.data.success) {
        toast.dismiss("updateToast");
        toast.success("Pet details updated successfully");
        navigate(`/mypets`);
      } else {
        toast.dismiss("updateToast");
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error updating pet details:", error);
      toast.dismiss("updateToast");
      toast.error("An error occurred while updating pet details");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-grid">
      <h1>Edit Pet</h1>

      <div className="column">
        <input
          type="text"
          placeholder="Enter pet name"
          name="name"
          value={pet.name}
          onChange={handleChange}
        />
        <input
          type="number"
          placeholder="Enter pet age"
          name="age"
          value={pet.age}
          onChange={handleChange}
        />
      </div>
      <div className="column">
        <input
          type="text"
          placeholder="Enter pet breed"
          name="breed"
          value={pet.breed}
          onChange={handleChange}
        />
        <select name="species" value={pet.species} onChange={handleChange}>
          <option value="" disabled>
            Select Species
          </option>
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
      </div>
      <textarea
        placeholder="Pet description"
        name="description"
        value={pet.description}
        onChange={handleChange}
      ></textarea>
      <div className="column">
        <input
          type="number"
          placeholder="Enter pet price"
          name="price"
          value={pet.price}
          onChange={handleChange}
        />
        <input
          type="file"
          name="img"
          ref={imageRef}
          onChange={handleImageChange}
        />
      </div>
      <button type="submit">Update Pet</button>
    </form>
  );
};

export default EditPet;
