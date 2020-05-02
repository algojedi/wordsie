import cloneDeep from "lodash/cloneDeep";
export const ADD_WORD = 'ADD_WORD';
export const REMOVE_WORD = "REMOVE_WORD";
export const RENEW_CART = "RENEW_CART";
export const EMPTY_CART = "EMPTY_CART";

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


//state is word cart
const removeWordFromCart = (wordId, state) => {
 //make post request to api  to remove word

  const updatedCart = state.filter(el => {
    return el._id !== wordId
  }  );
  
  if (updatedCart.length === state.length) {
    //console.log('nothing was removed from client side cart')
    return state;
  }
  //console.log('updated cart from remove word reducer ', updatedCart);
  return updatedCart; //TODO: always returning empty cart!? - fixed?

};

//state is an array of word information objects
export const cartReducer = (state, action) => {
  switch (action.type) {
    case ADD_WORD:
      return addWordToCart(action.payload, state);
    case REMOVE_WORD:
      return removeWordFromCart(action.payload, state);
    case RENEW_CART: 
    //  console.log('new cart state from renew cart reducer should be ', action.payload.cart);
      return action.payload.cart; //initializes state to payload  
    // case EMPTY_CART:
    //   return []
    default: 
      return state;
  }
};