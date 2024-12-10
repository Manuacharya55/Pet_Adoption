import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import ShopsPage from "./Pages/ShopsPage";
import PetPage from "./Pages/PetPage";
import WishListPage from "./Pages/WishListPage";
import RegisterPage from "./Pages/RegisterPage";
import LoginPage from "./Pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import BecomeShopkeeper from "./Pages/BecomeShopkeeper";
import ShopDescription from "./Pages/ShopDescription";
import PetDescription from "./Pages/PetDescription";
import ShopkeeperPage from "./Pages/ShopkeeperPage";
import AddPet from "./components/AddPet";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RegisterPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route path="/home" element={<HomePage />} />
        <Route path="/shops" element={<ShopsPage />} />
        <Route path="/shops/:id" element={<ShopDescription />} />
        <Route path="/pets" element={<PetPage />} />
        <Route path="/pets/:id" element={<PetDescription />} />
        <Route path="/wishlist" element={<WishListPage />} />
        <Route path="/shopkeeper" element={<BecomeShopkeeper />} />

        <Route path="/mypets" element={<ShopkeeperPage />} />
        <Route path="/deletepet/:id" element={<ShopkeeperPage />} />
        <Route path="/editpet/:id" element={<ShopkeeperPage />} />
        <Route path="/addpet" element={<ShopkeeperPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
