import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useAdoption } from '../context/PetContext';
import axios from 'axios';

const PetDescription = () => {
    const { id } = useParams();
    const { user } = useAdoption();
  
    const fetchPet = async (req, res) => {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/pet/${id}`, {
          headers: {
            "Content-Type": "application/json",
            "Auth-Token": user.token,
          },
        });
  
        if (response.data.success) console.log(response.data);
      } catch (error) {
          console.log(error);
      }
    };
  
    useEffect(() => {
      fetchPet()
    }, []);
    return <div>PetDescription {id}</div>;
  };

export default PetDescription