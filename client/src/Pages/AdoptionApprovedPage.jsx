// React Component for Shopkeeper Adoption Table
import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,} from "@mui/material";
import axios from "axios";
import {useAdoption} from "../context/PetContext"
const AdoptionApprovedPage = () => {
  const [adoptionData, setAdoptionData] = useState([]);
const {user} = useAdoption()
  // Fetch data on component mount
  useEffect(() => {
    const fetchAdoptions = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/v1/adopt/approved",{
            headers: {
              "Content-Type": "application/json",
              "Auth-Token": user.token,
            },
  
        }); // Adjust endpoint as needed
        setAdoptionData(response.data.statusCode);
      } catch (error) {
        console.error("Error fetching adoption data:", error);
      }
    };

    fetchAdoptions();
  }, []);

  console.log(adoptionData)
  // Handle status change

  return (
    <div className="table-holder">
        <TableContainer component={Paper}>
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
    </div>
  );
};

export default AdoptionApprovedPage;
