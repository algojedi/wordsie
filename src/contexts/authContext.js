import React, { useState, useReducer, createContext } from "react";
import { ADD_WORD, REMOVE_WORD, RENEW_CART, cartReducer } from "./reducers";
const AuthContext = createContext(); //creates Provider

export const AuthContextProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  const [cart, dispatch] = useReducer(cartReducer, [] );

  // CONFUSION BECAUSE MIXING USESTATE AND USEREDUCER....? or is that ok

  

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
    setTimeout(() => {
      dispatch({ type: RENEW_CART, payload: newCart });
    }, 200);
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
