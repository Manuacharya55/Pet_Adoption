// React Component for Shopkeeper Adoption Table
import { useState, useEffect } from "react";
import { InfinitySpin } from 'react-loader-spinner';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";

import { useAdoption } from "../context/PetContext";
import HandleRequest from "./HandleRequest";

const ShopkeeperAdoptionTable = () => {
  const [adoptionData, setAdoptionData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
  const { user } = useAdoption();

  const fetchAdoptions = async () => {
    const response = await HandleRequest({
      method: "get",
      token: user.token,
      url: `adopt`,
      onSuccess: " ",
      onError: "Failed To fetch",
    });

    if (response) {
      setAdoptionData(response.data);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAdoptions();
  }, []);


  const handleStatusChange = async (id, newStatus) => {
    const response = await HandleRequest({
      method: "patch",
      token: user.token,
      url: `adopt/${id}`,
      data: { status: newStatus },
      onSuccess: `${newStatus} successfully`,
      onError: "Failed To fetch",
    });

    if (response) {
      setAdoptionData((prevData) => prevData.filter((item) => item._id !== id));
    }
  };

  if(isLoading) return ( <InfinitySpin
          visible={true}
          width="200"
          color="#37B9F1"
          ariaLabel="infinity-spin-loading"
          />)
  return (
    <>
      <div className="banner">
        <h1>Adoption Requests</h1>
      </div>
      {adoptionData.length > 0 ? (<div className="container">
        <TableContainer component={Paper} className="custom-table">
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
                  <TableCell>"{adoption.petId.name}"</TableCell>
                  <TableCell>{adoption.petId.breed}</TableCell>
                  <TableCell>
                    <FormControl>
                      <Select
                        value={adoption.status}
                        onChange={(e) =>
                          handleStatusChange(adoption._id, e.target.value)
                        }
                      >
                        <MenuItem value="pending">Pending</MenuItem>
                        <MenuItem value="approved">Approved</MenuItem>
                        <MenuItem value="rejected">Rejected</MenuItem>
                      </Select>
                    </FormControl>
                  </TableCell>
                  <TableCell>
                    {new Date(adoption.createdAt).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>) : "No Requests Yet"}
    </>
  );
};

export default ShopkeeperAdoptionTable;
