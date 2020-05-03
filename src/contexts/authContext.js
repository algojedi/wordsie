import React, { useState, useReducer, createContext } from "react";
import api from "../api/api";

// import {
//   ADD_WORD,
//   REMOVE_WORD,
//   RENEW_CART,
//   cartReducer,
//   EMPTY_CART,
// } from "./reducers";
import axios from "axios";



import cloneDeep from "lodash/cloneDeep";
export const ADD_WORD = "ADD_WORD";
export const REMOVE_WORD = "REMOVE_WORD";
export const RENEW_CART = "RENEW_CART";
export const EMPTY_CART = "EMPTY_CART";

const AuthContext = createContext(); //creates Provider

const addWordToCart = (wordInfo, state) => {
  const updatedCart = cloneDeep(state); //state is an array of word information objects
  //check if word already exists in cart
  updatedCart.forEach((w) => {
    if (w._id.toString() === wordInfo._id.toString()) {
      //NOT SURE IF THIS COMPARISON WILL WORK
      return state;
    }
  });
  updatedCart.push({ ...wordInfo });
  return updatedCart;
};

//state is word cart
const removeWordFromCart = (wordId, state) => {
  //make post request to api  to remove word

  const updatedCart = state.filter((el) => {
    return el._id !== wordId;
  });

  if (updatedCart.length === state.length) {
    return state;
  }
  return updatedCart;
};

//state is an array of word information objects
export const cartReducer = (state, action) => {
  switch (action.type) {
    case ADD_WORD:
      return addWordToCart(action.payload, state);
    case REMOVE_WORD:
      return removeWordFromCart(action.payload, state);
    case RENEW_CART:
      return action.payload.cart; //initializes state to payload
    default:
      return state;
  }
};

























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
      const url = `${api.url}logout`;
      axios({
        url,
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }).catch(err => console.log(err))
      //then((resp) => console.log(resp));
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
