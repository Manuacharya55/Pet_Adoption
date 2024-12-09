import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const AdoptionContext = createContext(null);

export const AdoptionProvider = ({ children }) => {
  const [user, setUser] = useState({
    token: "",
    role: "",
  });

  const [isLoggedin,setIsLoggedin] = useState(false);
  const fetchUserToken = () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token && role) {
      setUser({ token, role });
      setIsLoggedin(true);
    }
  };

  const setUserToken = (token, role) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    setUser({ token, role });
    setIsLoggedin(true);
  };

  useEffect(() => {
    fetchUserToken();
  }, []);

  return (
    <AdoptionContext.Provider value={{ user, fetchUserToken, setUserToken,isLoggedin }}>
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
