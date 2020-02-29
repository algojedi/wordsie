import React from 'react'



const WordCartItem = ({ wordInfo }) => {
    //console.log('received in the word cart ', wordInfo)
    // if (!wordInfo) {
    //     return null;
    // }
    
    return (
    <section className='word-cart_item'>
        <h3 className='word-cart_item-word'>{wordInfo.word}</h3>
        <article className='word-cart_item-type'>
        {wordInfo.part}
        </article>
        <article className='word-cart_item-def'>
        {/* RENDER PROP USE CASE????
        {wordInfo.definitions.map((d,i)=> )} */}
        </article>
            


    </section> )
        
}
 
export default WordCartItem;