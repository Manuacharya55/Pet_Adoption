// React Component for Shopkeeper Adoption Table
import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem, FormControl } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import {useAdoption} from "../context/PetContext"
const ShopkeeperAdoptionTable = () => {
  const [adoptionData, setAdoptionData] = useState([]);
const {user} = useAdoption()
  // Fetch data on component mount
  useEffect(() => {
    const fetchAdoptions = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/v1/adopt",{
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

  // Handle status change
  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await axios.patch(`http://localhost:5000/api/v1/adopt/${id}`, {
        status: newStatus,
      },{
        headers: {
          "Content-Type": "application/json",
          "Auth-Token": user.token,
        },
      });
      // Update the status locally after successful update
      if(response.data.success){
        toast.success(response.data.message);
        setAdoptionData((prevData) =>
          prevData.filter((item) =>
            item._id !== id
          )
        );
      }else{
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error updating status:", error);
    }
  };

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
            <TableCell>Status</TableCell>
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
              <TableCell>
                <FormControl>
                  <Select
                    value={adoption.status}
                    onChange={(e) => handleStatusChange(adoption._id, e.target.value)}
                  >
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="approved">Approved</MenuItem>
                    <MenuItem value="rejected">Rejected</MenuItem>
                  </Select>
                </FormControl>
              </TableCell>
              <TableCell>{new Date(adoption.createdAt).toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
};

export default ShopkeeperAdoptionTable;
