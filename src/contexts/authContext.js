import React, { useState, useReducer, createContext } from "react";
import { ADD_WORD, REMOVE_WORD, RENEW_CART, cartReducer } from "./reducers";
const AuthContext = createContext(); //creates Provider

export const AuthContextProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  const [cart, dispatch] = useReducer(cartReducer, [] );
//TODO: useReducer above should have initial state read in from db
  

  const addWordToCart = wordInfo => {
    //wordInfo should be an object holding word information
    dispatch({ type: ADD_WORD, payload: wordInfo });
    // setTimeout(() => {
    // }, 200);
  };

  const removeWordFromCart = wordId => {
    dispatch({ type: REMOVE_WORD, payload: wordId });
    // setTimeout(() => {
    // }, 200);
  };

  const renewCart = newCart => {
      dispatch({ type: RENEW_CART, payload: newCart });
  }

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
        renewCart
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
