import React, { useReducer, createContext } from "react";
import cloneDeep from "lodash/cloneDeep";
export const ADD_WORD = "ADD_WORD";
export const REMOVE_WORD = "REMOVE_WORD";
export const SET_CART = "SET_CART";
export const EMPTY_CART = "EMPTY_CART";


const CartContext = createContext(); //creates Provider

const addWordToCart = (wordInfo, state) => {
    const updatedCart = cloneDeep(state) //state is an array of word information objects
    //check if word already exists in cart
    updatedCart.forEach((w) => {
        if (w._id.toString() === wordInfo._id.toString()) {
            return state
        }
    })
    updatedCart.push({ ...wordInfo })
    return updatedCart
}

//state is word cart
const removeWordFromCart = (wordId, state) => {
    // TODO: make post request to api  to remove word
    const updatedCart = state.filter((el) => {
        return el._id !== wordId
    })
    if (updatedCart.length === state.length) {
        return state
    }
    return updatedCart
}

//state is an array of word information objects
export const cartReducer = (state, action) => {
    switch (action.type) {
        case ADD_WORD:
            return addWordToCart(action.payload, state)
        case REMOVE_WORD:
            return removeWordFromCart(action.payload, state)
        case SET_CART:
            console.log({ payload: action.payload })
            return action.payload
        default:
            return state
    }
}

export const CartContextProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, []);

  const addWordToCart = (wordInfo) => {
    //wordInfo should be an object holding word information
    dispatch({ type: ADD_WORD, payload: wordInfo });
  };

  const removeWordFromCart = (wordId) => {
    dispatch({ type: REMOVE_WORD, payload: wordId });
  };

  const setCart = (newCart) => {
    console.log({newCart})
    dispatch({ type: SET_CART, payload: newCart });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addWordToCart,
        removeWordFromCart,
        setCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
