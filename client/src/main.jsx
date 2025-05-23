import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { AdoptionProvider } from "./context/PetContext.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ShopKeeperProvider } from "./context/ShopKeeperContext.jsx";
createRoot(document.getElementById("root")).render(
    <AdoptionProvider>
      <ShopKeeperProvider>
        <App />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        {/* Same as */}
        <ToastContainer />
      </ShopKeeperProvider>
    </AdoptionProvider>
);
