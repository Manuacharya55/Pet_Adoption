// React Component for Shopkeeper Adoption Table
import React, { useState, useEffect } from "react";
import { InfinitySpin } from 'react-loader-spinner';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem, FormControl } from "@mui/material";
import axios from "axios";
import {useAdoption} from "../context/PetContext"
const AdoptionRejectedPage = () => {
  const [adoptionData, setAdoptionData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
const {user} = useAdoption()
  // Fetch data on component mount
  useEffect(() => {
    const fetchAdoptions = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/v1/adopt/rejected",{
            headers: {
              "Content-Type": "application/json",
              "Auth-Token": user.token,
            },
  
        }); // Adjust endpoint as needed
        setAdoptionData(response.data.statusCode);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching adoption data:", error);
      }
    };

    fetchAdoptions();
  }, []);

 if(isLoading) return ( <InfinitySpin
            visible={true}
            width="200"
            color="#37B9F1"
            ariaLabel="infinity-spin-loading"
            />)

  return (
    <>
    <div className="banner">
      <h1>Adoption Rejected</h1>
    </div>
    {adoptionData.length > 0 ? (<div className="container" >
      <TableContainer component={Paper}  className="custom-table">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>User Name</TableCell>
            <TableCell>User Email</TableCell>
            <TableCell>Pet Name</TableCell>
            <TableCell>Breed</TableCell>
            <TableCell>Created At</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {adoptionData.map((adoption) => (
            <TableRow key={adoption._id}>
              <TableCell>{adoption.userId.name}</TableCell>
              <TableCell>{adoption.userId.email}</TableCell>
              <TableCell>{adoption.petId.name}</TableCell>
              <TableCell>{adoption.petId.breed}</TableCell>
              <TableCell>{new Date(adoption.createdAt).toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>) : "No Data Yet"}
    </>
  );
};

export default AdoptionRejectedPage;
