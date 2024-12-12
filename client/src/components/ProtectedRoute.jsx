import { Navigate, Outlet } from "react-router-dom";
import { useAdoption } from "../context/PetContext";

import { useNavigate } from "react-router-dom";
const ProtectedRoute = () => {
  const { isLoggedin } = useAdoption();
  const navigate = useNavigate();
  return isLoggedin ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
