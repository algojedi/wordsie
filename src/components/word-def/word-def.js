import React, { Component } from 'react'

//a component to display word information after user searches
//for a word definition from the main search bar
const WordDefinition = ({wordInformation}) => {
    //console.log('props from wordDefin component') ; 
    //console.log(wordInformation);
    if (!wordInformation) {
        return; //needless insurance
    }
    const {definitions} = wordInformation;

    const defsToDisplay = definitions.map((item, i) => {
      return (
        <li key={i}>
            <section>
                {item.definition}
            </section>
            <ul>
                {item.examples.map((ex, i) => <li key={i}> {ex} </li>)}
            </ul>
        </li>)
    });

    return (
      <div>
        <div>showing word def comp</div>
        <section>{wordInformation.word}</section>
        <article>{wordInformation.part}</article>
        {<ul>{defsToDisplay}</ul>}
      </div>
    );
}
 
export default WordDefinition;