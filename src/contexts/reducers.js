import cloneDeep from "lodash/cloneDeep";
export const ADD_WORD = 'ADD_WORD';
export const REMOVE_WORD = "REMOVE_WORD";
export const RENEW_CART = "RENEW_CART";

const addWordToCart = (wordInfo, state) => {
  console.log('wordinfo in addd to cart ', wordInfo);
  const updatedCart = cloneDeep(state); //state is an array of word information objects
  //check if word already exists in cart
  updatedCart.forEach(w => {
    if (w._id.toString() === wordInfo._id.toString()) { //NOT SURE IF THIS COMPARISON WILL WORK
      return state;
    }
  })
  updatedCart.push({ ...wordInfo });
  return updatedCart;
};



const removeWordFromCart = (wordId, state) => {
  console.log("Removing word with id: " + wordId);

  const updatedCart = state.filter(el => !el._id.equals(wordId) );
  //TODO: DOES FILTER RETURN A DEEP COPY??  ERR: el._id.equals is not a fn
    
  if (updatedCart.length === state.length) {
    //nothing was removed
    console.log('nothing was removed from client side cart')
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