import React, { useState, useContext } from "react";
import AuthContext from "../../contexts/authContext";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import WordDefinition from "../../components/word-def/word-def";
import WordCart from "../../components/word-cart/word-cart";
import axios from "axios";

import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";

import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    minWidth: 275,
    maxWidth: 500,
    margin: 15,
  },
  container: {
      display: "flex",
      flex: 1,
      background: "#28536B",
      padding: 0,
      
      justifyContent: "center"
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
}));

const WordSearchBar = () => {
    const classes = useStyles();
    const wordSearchUrl = "http://localhost:3001/define?word=";

    //word is the current word to search
    const [word, setWord] = useState("");
    //wordInfo is the word information retrieved from api or db
    const [wordInfo, setWordInfo] = useState({}); //includes word, part, definitions
    //showDefinition controls whether word definition (wordInfo) is displayed
    const [showDefinition, setShowDefinition] = useState(false);

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (word === "") {
        return;
      } //TODO: display error message due to no input in search field
      try {
        const result = await axios.get(wordSearchUrl + word);
        console.log("response received in main page word query ", result.data);
        if (result.data && result.status === 200) {
          setWordInfo(result.data);
          setShowDefinition(true);
        }
      } catch (err) {
        //TODO: label for material ui input error label
        //'response' in err ? console.log(err.response.data.message) : console.log(err);
      }
    };

    

    return (
      <Container component="main" className={classes.container}>
        <Paper component="form" className={classes.root}>
          <InputBase
            className={classes.input}
            placeholder="Word Search"
            value={word}
            onChange={(e) => setWord(e.target.value)}
          />
          <IconButton
            type="submit"
            onClick={handleSubmit}
            noValidate
            className={classes.iconButton}
            aria-label="search"
          >
            <SearchIcon />
          </IconButton>
        </Paper>
      </Container>
    );

}
 



export default WordSearchBar;
