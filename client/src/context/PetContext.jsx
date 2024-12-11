import { createContext, useContext, useEffect, useState } from "react";

const AdoptionContext = createContext(null);

export const AdoptionProvider = ({ children }) => {
  const [user, setUser] = useState(() => ({
    token: localStorage.getItem("token") || "",
    role: localStorage.getItem("role") || "",
  }));
  const [isLoggedin, setIsLoggedin] = useState(() =>
    Boolean(localStorage.getItem("token") && localStorage.getItem("role"))
  );

  const setUserToken = (token, role) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    setUser({ token, role });
    setIsLoggedin(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setUser({ token: "", role: "" });
    setIsLoggedin(false);
  };

  useEffect(()=>{
    if(localStorage.getItem("token") && localStorage.getItem("role")){
      setUserToken(localStorage.getItem("token"), localStorage.getItem("role"))
      setIsLoggedin(true)
    }
  },[])
  return (
    <AdoptionContext.Provider
      value={{ user, setUserToken, isLoggedin, logout }}
    >
      {children}
    </AdoptionContext.Provider>
  );
};

export const useAdoption = () => {
  const context = useContext(AdoptionContext);
  if (!context) {
    throw new Error("useAdoption must be used within an AdoptionProvider");
  }
  return context;
};
