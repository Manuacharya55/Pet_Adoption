import { useContext, createContext, useState, useReducer } from "react";

export const ShopkeeperContext = createContext();

export const ShopKeeperProvider = ({ children }) => {

    function reducer(state, action) {
        switch (action.type) {
          case "ADD":
            return [...state, action.payload];
          case "REMOVE":
            return state.filter(item => item._id !== action.payload); // Remove item by ID
          case "UPDATE":
            return state.map(item =>
              item._id === action.payload.id ? { ...item, ...action.payload.data } : item
            );
          case "LOAD":
            return action.payload;
          default:
            throw new Error(`Unsupported action type: ${action.type}`);
        }
      }
  const[state,dispatch] = useReducer(reducer,[])
  return (
    <ShopkeeperContext.Provider
      value={{ state, dispatch }}
    >
      {children}
    </ShopkeeperContext.Provider>
  );
};

export const useShopKeeper = () => {
  const context = useContext(ShopkeeperContext);
  if (!context) {
    throw new Error("useShopkeeper must be used within a ShopkeeperProvider");
  }

  return context;
};
