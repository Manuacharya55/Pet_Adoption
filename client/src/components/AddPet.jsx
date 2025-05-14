import React, { useRef } from "react";
import { useAdoption } from "../context/PetContext";
import { toast } from "react-toastify";
import axios from "axios";
import { useShopKeeper } from "../context/ShopKeeperContext";

const AddPet = () => {
  const { user } = useAdoption();
  const { dispatch } = useShopKeeper();
  const imageRef = useRef();
  const [pet, setPet] = React.useState({
    name: "",
    species: "",
    breed: "",
    gender:"",
    age: 0,
    description: "",
    imageUrl: "",
  });
  const handleChange = (e) => {
    setPet((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleImageChange = (e) => {
    const img = imageRef.current.files[0];
    setPet((prev) => {
      return { ...prev, imageUrl: img };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.info("Image is uploading...", {
      autoClose: false,
      toastId: "uploadToast",
    });
    console.log(pet)
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/pet/",
        pet,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Auth-Token": user.token,
          },
        }
      );

      if (response.data.success) {
        toast.dismiss("uploadToast");
        toast.success("Pet Added Successfully");
        dispatch({ type: "ADD", payload: response.data.data });
      } else {
        toast.dismiss("uploadToast");
        toast.error(response.data.message);
      }
    } catch (error) {
      //console.log(error);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <h1>Add Pet</h1>
      <div className="column">
        <input
          type="text"
          placeholder="enter pet name"
          name="name"
          value={pet.name}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="enter pet age"
          name="age"
          value={pet.age}
          onChange={handleChange}
        />
      </div>
      <div className="column">
        <input
          type="text"
          placeholder="enter pet breed"
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
          <option value="Fish">Fish</option>
        </select>
      </div>

      <textarea
        placeholder="pet description"
        name="description"
        value={pet.description}
        onChange={handleChange}
      ></textarea>
      <div className="column">
        <input
          type="number"
          placeholder="enter pet price"
          name="price"
          value={pet.price}
          onChange={handleChange}
        />
        <input
          type="file"
          name="img"
          id=""
          ref={imageRef}
          onChange={handleImageChange}
        />
      </div>
      <input
          type="text"
          placeholder="enter pet gender"
          name="gender"
          value={pet.gender}
          onChange={handleChange}
        />
      <button type="submit">Add Pet</button>
    </form>
  );
};

export default AddPet;
