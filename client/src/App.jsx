import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import ShopsPage from "./Pages/ShopsPage";
import PetPage from "./Pages/PetPage";
import WishListPage from "./Pages/WishListPage";
import RegisterPage from "./Pages/RegisterPage";
import LoginPage from "./Pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import BecomeShopkeeper from "./Pages/BecomeShopkeeper";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RegisterPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />

          <Route path="/home" element={<HomePage />} />
          <Route path="/shops" element={<ShopsPage />} />
          <Route path="/pets" element={<PetPage />} />
          <Route path="/wishlist" element={<WishListPage />} />
          <Route path="/shopkeeper" element={<BecomeShopkeeper />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
