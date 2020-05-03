import React, { useState, useContext } from "react";
import Typography from "@material-ui/core/Typography";
import AuthContext from "../../contexts/authContext";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import WordDefinition from "../../components/word-def/word-def";
import WordCart from "../../components/word-cart/word-cart";
import axios from "axios";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import Box from "@material-ui/core/Box";
import { useHistory } from "react-router-dom";
import { TextField } from "@material-ui/core";
import AlertDialog from "../../components/alert/delete-alert";

import api from "../../api/api"

const styles = (theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
    minWidth: 275,
    maxWidth: 500,
    margin: 15,
  },
  listTitle: {
    padding: 24, // the padding applied to expansion panels by default
    paddingBottom: 8,
    color: "#a3613d",
    [theme.breakpoints.down('xs')]: {
      fontSize: 16,
      fontWeight: "bold"
    }
  },
  guestMsg: {
    padding: 24, // the padding applied to expansion panels by default
    color: "#a3613d",
    cursor: "pointer",
    display: "inline-block",
    fontSize: 14,
  },
  removeListBtn: {
    border: "none",
  },
  listTitleContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  root: {
    display: "flex",
    background: "#28536B",
    flexGrow: 1,
    maxWidth: "100%",
    padding: 0,
    margin: 0,
    justifyContent: "center",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
});

const Main = ({ classes }) => { //classes coming from withStyles HOC

  const wordSearchUrl = `${api.url}define?word=`;   
  const history = useHistory();
  const context = useContext(AuthContext);
  //word is the current word to search
  const [word, setWord] = useState("");
  //wordInfo is the word information retrieved from api or db
  const [wordInfo, setWordInfo] = useState({}); //includes word, part, definitions
  //showDefinition controls whether word definition (wordInfo) is displayed
  const [showDefinition, setShowDefinition] = useState(false);
  const [invalidEntry, setInvalidEntry] = useState(false);
  //state to track whether use should be allowed to enter the displayed word into cart
  const [invalidCartEntry, setInvalidCartEntry] = useState(true)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (word === "") {
      setInvalidEntry(true);
      return;
    }
    try {
      const result = await axios.get(wordSearchUrl + word);
      if (result.data && result.status === 200) {
        setWordInfo(result.data);
        setShowDefinition(true);
        setInvalidEntry(false);
        setInvalidCartEntry(false);
        setWord("");
      }
    } catch (err) {
      console.log(err);
      setInvalidEntry(true);
    }
  };

  const addToCartUrl = "http://localhost:3001/addWordToCart";
  const handleAddToCart = async () => {

    try {
      const token = window.sessionStorage.getItem("token");
      if (!token || invalidCartEntry) {
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
          word: wordInfo.word,
        },
      });
      if (result.data && result.status === 200) {
        context.addWordToCart(result.data);
        setInvalidCartEntry(true); //user can not continually add same word
      }
    } catch (err) {
      console.log(err);
      //'response' in err ? console.log(err.response.data.message) : console.log(err);
    }
  };
  return (
    <React.Fragment>
      <Container className={classes.root} component="main">
        <Paper component="form" className={classes.container}>
          <TextField
            className={classes.input}
            placeholder="Word Search"
            error={invalidEntry}
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
                Add to My List
              </Button>
            );
          }}
          wordInformation={wordInfo}
        />
      ) : null}
      {context.authenticated ? (
        <Box className={classes.listTitleContainer}>
          <Typography className={classes.listTitle} variant="h5" gutterBottom>
            Your Word List
          </Typography>
          <AlertDialog />
        </Box>
      ) : (
        <Typography
          className={classes.guestMsg}
          onClick={() => history.push("/signin")}
          variant="h5"
          gutterBottom
        >
          Sign in required to a save word list
        </Typography>
      )}
      <WordCart words={context.cart} />
    </React.Fragment>
  );
};

export default withStyles(styles)(Main);
