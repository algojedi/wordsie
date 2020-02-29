import React from "react";
import WordCartItem from "../word-cart-item/word-cart-item";

const WordCart = ({ words }) => {
  console.log('received in the word cart ', words)
  if (!words) {
      console.log('returning early due to null condn')
    return null;
  }
  console.log('do i ever get past null condn?')
  return words.map((w, i) => {
    return <WordCartItem wordInfo={w} key={i} />;
  });
};

export default WordCart;
