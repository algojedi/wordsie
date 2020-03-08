import React, { useState, useContext } from "react"; 
import AuthContext from "../../contexts/authContext";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import WordDefinition from "../../components/word-def/word-def"
// import WordCart from "../../components/word-cart/word-cart";
import TmpWordCart from "../../components/tmp-word-cart/TmpWordCart";
import axios from "axios";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
  },
  
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));


const Main = () => {
    
    const classes = useStyles();
    const wordSearchUrl = "http://localhost:3001/define?word=";
    const addToCartUrl = "http://localhost:3001/addWordToCart";

    const context = useContext(AuthContext);
    //word is the current word to search
    const [word, setWord] = useState('');
    //wordInfo is the word information retrieved from api or db
    const [wordInfo, setWordInfo] = useState({}); //includes word, part, definitions
    //showDefinition controls whether word definition (wordInfo) is displayed
    const [showDefinition,setShowDefinition] = useState(false);

    const handleSubmit = async e => {
      e.preventDefault();
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
    }

    
    const handleAddToCart = async () => {
      //e.preventDefault();
      try {
        const token = window.sessionStorage.getItem("token");
    
    if (!token) { 
      console.log('missing token from session');
      return;
    }
    
      console.log('word being sent to axios is ', word);
      const result = await axios({
                  url: addToCartUrl, 
                  method: "post",
                  headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                  },
                  data: {  //represents the body
                    word
                  }
                });

        console.log("response received from addtocart url", result);
        
        if (result.data && result.status === 200) {
            context.addWordToCart(result.data);
         }
      } catch (err) {
        console.log(err);
        //'response' in err ? console.log(err.response.data.message) : console.log(err);
      }
    }    
    console.log('context.cart from main ', context.cart)
    return (
      <div>
        {/* <h1>Hello {context.user.name} </h1>
        <hr></hr> */}
        <Container component="main" maxWidth="xs">
          <div className={classes.paper}>
            <form className={classes.form} onSubmit={handleSubmit} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Search Word"
                name="word"
                autoFocus
                value={word}
                onChange={e => setWord(e.target.value)}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Submit
              </Button>
            </form>
          </div>
        </Container>
        {showDefinition ? <WordDefinition wordInformation={wordInfo} /> : null}
        {showDefinition ? (
          <Button
            onClick={handleAddToCart}
            variant="contained"
            color="secondary"
            className={classes.submit}
          >
            Add to Cart
          </Button>
        ) : null}
        <h3>Your Cart</h3>
        <TmpWordCart words={context.cart} />

        {/* <WordCart words={context.cart} /> */}
      </div>
    );
}
 
export default Main;

