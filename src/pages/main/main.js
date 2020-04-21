import React, { useState, useContext } from "react";
import AuthContext from "../../contexts/authContext";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import WordDefinition from "../../components/word-def/word-def";
import WordCart from "../../components/word-cart/word-cart";
import axios from "axios";
import SendIcon from "@material-ui/icons/Send";

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
    margin: 30,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },

  //   paper: {
  //     marginTop: theme.spacing(4),
  //     display: "flex",
  //     flexDirection: "row",
  //     justifyContent: "center"
  //   },
  // mainBody: {
  //   margin: 'auto',
  //   width: "80%"
  // },
  //   form: {
  //     width: "100%", // Fix IE 11 issue.
  //     flexDirection: "row",
  //     display: "flex",
  //     alignItems: "center",
  //     position: "relative",
  //   },
  //   submit: {
  //     //margin: theme.spacing(3, 0, 2),
  //     marginLeft: '15px',
  //     position: "relative",
  //     right: 16,
  //     top: 3.5

  //   },
  //   searchField: {
  //     paddingRight: 10
  //     // height: 1
  //   }
}));
const height = 45; // height of search field

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

      if (!token) {
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
          //represents the body
          word,
        },
      });

      // console.log("response received from addtocart url", result);

      if (result.data && result.status === 200) {
        context.addWordToCart(result.data);
      }
    } catch (err) {
      console.log(err);
      //'response' in err ? console.log(err.response.data.message) : console.log(err);
    }
  };
  console.log("context.cart from main ", context.cart);
  return (
    <div className={classes.mainBody}>
      <Container component="main" >
        {/* <div className={classes.paper}>
          <form className={classes.form} onSubmit={handleSubmit} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Search Word"
              name="word"
              className={classes.searchField}
              autoFocus
              inputProps={{
      style: {
        height,
        padding: 0
      },
  }}
              value={word}
              onChange={e => setWord(e.target.value)}
            />
            <Button
              type="submit"
              margin="normal"
              variant="outlined"
              color="primary"
              className={classes.submit}
              style={{maxWidth: '45px', maxHeight: '45px', minWidth: '45px', minHeight: '45px'}}
             
            >
              
              <SendIcon/>
            </Button>
          </form>
        </div> */}

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

      <h3>Your Word List </h3>
      <WordCart words={context.cart} />
    </div>
  );
};

export default Main;
{
  /*
 

*/
}
