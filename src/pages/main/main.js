import React, { useState, useContext } from "react";
import Typography from "@material-ui/core/Typography";
import AuthContext from "../../contexts/authContext";
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
import WordSearchBar from "../../components/word-searchbar/word-searchbar"

const useStyles = makeStyles((theme) => ({
  container: {
    // padding: "1px 3px",
    display: "flex",
    alignItems: "center",
    minWidth: 275,
    maxWidth: 500,
    margin: 15,
  },
  listTitle: {
    padding: 24, // the padding applied to expansion panels by default
    paddingBottom: 12,
    color: '#a3613d'
  },
  root: {
      display: "flex",
      background: "#28536B",
      flexGrow: 1,
      maxWidth: "100%",
      padding: 0,
      margin: 0,
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

const Main = () => {
  const classes = useStyles();
  const wordSearchUrl = "http://localhost:3001/define?word=";
  const addToCartUrl = "http://localhost:3001/addWordToCart";

  const context = useContext(AuthContext);
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
      //console.log("response received in main page word query ", result.data);
      if (result.data && result.status === 200) {
        setWordInfo(result.data);
        setShowDefinition(true);
        setWord("");
      }
    } catch (err) {
      //TODO: label for material ui input error label
      //'response' in err ? console.log(err.response.data.message) : console.log(err);
    }
  };

  const handleAddToCart = async () => {
    //e.preventDefault();
    try {
      const token = window.sessionStorage.getItem("token");

      if (!token) { //return early if no token
        console.log("missing token from session");
        return;
      }
      const result = await axios({
        url: addToCartUrl,
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        data: {
          word,
        },
      });
      if (result.data && result.status === 200) {
        context.addWordToCart(result.data);
      }
    } catch (err) {
      console.log(err);
      //'response' in err ? console.log(err.response.data.message) : console.log(err);
    }
  };
  return (
    <React.Fragment> 
      <Container className={classes.root} component="main" >
        <Paper component="form" className={classes.container}>
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

      {showDefinition ? (
        <WordDefinition
          addToCartBtn={() => {
            return (
              <Button
                onClick={handleAddToCart}
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Add to List
              </Button>
            );
          }}
          wordInformation={wordInfo}
        />
      ) : null}

      <Typography className={classes.listTitle} variant="h5" gutterBottom>
      Your Word List 
      </Typography>
      <WordCart words={context.cart} />
    </React.Fragment>
  );
};

export default Main;
