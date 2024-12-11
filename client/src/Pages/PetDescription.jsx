import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAdoption } from '../context/PetContext';
import axios from 'axios';

const PetDescription = () => {
    const { id } = useParams(); // Extract the pet ID from the route params
    const { user } = useAdoption(); // Get user context
    const [pet, setPet] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPetDetails = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:5000/api/v1/pet/${id}`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Auth-Token": user.token,
                    },
                });
                if (response.data.success) {
                    setPet(response.data.data);
                } else {
                    setError('Failed to fetch pet details.');
                }
            } catch (err) {
                setError('An error occurred while fetching pet details.');
            } finally {
                setLoading(false);
            }
        };

        fetchPetDetails();
    }, [id, user.token]);


    const handleAddToWishlist = async () => {
      try {
          const response = await axios.post(`http://localhost:5000/api/v1/wishlist`, {
              petId: id
          }, {
              headers: {
                  "Content-Type": "application/json",
                  "Auth-Token": user.token,
              },
          });
          if (response.data.success) {
              alert('Pet added to wishlist successfully!');
          }
      } catch (error) {
          alert('Failed to add pet to wishlist.');
      }
  };

  const handleAdoptRequest = async () => {
      try {
          const response = await axios.post(`http://localhost:5000/api/v1/adopt`, {
              petId: id
          }, {
              headers: {
                  "Content-Type": "application/json",
                  "Auth-Token": user.token,
              },
          });
          if (response.data.success) {
              alert('Adoption request submitted successfully!');
          }
      } catch (error) {
          alert('Failed to submit adoption request.');
      }
  };


    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className='pet-details'>
            {pet && (
                <>
                <div className='image-holder'>
                    <img
                        src={pet.imageUrl}
                        alt={pet.name}
                        style={{ width: '100%', borderRadius: '8px' }}
                    />
                </div>
                <div className='pet-desc'>
                    <h2>Pet Name : {pet.name}</h2>
                    <p><strong>Breed:</strong> {pet.breed}</p>
                    <p><strong>Species:</strong> {pet.species}</p>
                    <p><strong>Age:</strong> {pet.age} years</p>
                    <p><strong>Description:</strong> {pet.description}</p>
                    <h1><strong>Price:</strong> ${pet.price}</h1>
                    <h3>Shop Details</h3>
                    <img
                        src={pet.shopId.imageUrl}
                        alt={pet.shopId.name}
                        style={{ width: '100px', height: '100px', borderRadius: '50%' }}
                    />
                    <p><strong>Shop Name:</strong> {pet.shopId.name}</p>
                    <p><strong>Location:</strong> {pet.shopId.location}</p>
                    <p><strong>Contact:</strong> {pet.shopId.contactInfo}</p>
                    

                    <div style={{ marginTop: '20px' }}>
                        <button onClick={handleAddToWishlist} id="wishlist">Add to Wishlist</button>
                        <button onClick={handleAdoptRequest} id="adopt">Adopt</button>
                    </div>
                </div>
                </>
            )}
        </div>
    );
};

export default PetDescription;
