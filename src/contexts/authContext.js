import React, { useState, useReducer, createContext } from "react";
import {
  ADD_WORD,
  REMOVE_WORD,
  RENEW_CART,
  cartReducer,
  EMPTY_CART,
} from "./reducers";
import axios from "axios";

const AuthContext = createContext(); //creates Provider

export const AuthContextProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  const [cart, dispatch] = useReducer(cartReducer, []);
  //TODO: useReducer above should have initial state read in from db

  const addWordToCart = (wordInfo) => {
    //wordInfo should be an object holding word information
    dispatch({ type: ADD_WORD, payload: wordInfo });
  };

  const removeWordFromCart = (wordId) => {
    dispatch({ type: REMOVE_WORD, payload: wordId });
  };

  const renewCart = (newCart) => {
    dispatch({ type: RENEW_CART, payload: newCart });
  };

  const signOut = () => {
    //sign out from server side first
    const token = window.sessionStorage.getItem("token");
    if (token) {
      const url = "http://localhost:3001/logout"; //TODO: change when deploying
      axios({
        url,
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }).then(resp => console.log(resp))

    }


    setUser(null);
    dispatch({ type: EMPTY_CART });
    setAuthenticated(false);
    window.sessionStorage.removeItem("token");
  };
  return (
    <AuthContext.Provider
      value={{
        authenticated,
        setAuthenticated,
        user,
        setUser,
        cart,
        addWordToCart,
        removeWordFromCart,
        renewCart,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
