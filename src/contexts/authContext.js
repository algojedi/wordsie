import React, { useState, createContext } from "react";
export const ADD_WORD = "ADD_WORD";
export const REMOVE_WORD = "REMOVE_WORD";
export const SET_CART = "SET_CART";
export const EMPTY_CART = "EMPTY_CART";

const AuthContext = createContext(); //creates Provider

// user composed of userId, email, password
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
