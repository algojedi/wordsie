import React from "react";
import WordCartItem from "../word-cart-item/word-cart-item";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  grid: {
    border: "2px solid red",
    width: "80%",
    margin: "auto"
  },
  gridItem: {
    width: "100%",
    outline: "red",
    textAlign: "left"
  }
}));

const WordCart = ({ words }) => {
  const classes = useStyles();
  
  const removeWord = async wordId => {
    console.log('clicked trash icon w wordid', wordId)
    const token = window.sessionStorage.getItem("token");

    const removeFromCartUrl = "http://localhost:3001/removeWord";

    const result = await axios({
      url: removeFromCartUrl,
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      data: {
        //represents the body
        wordId
      }
    })
    //TODO: need to remove from client side as well
    console.log('result from trying to remove word ', result)
  };
  //console.log('received in the word cart ', words)
  if (!words) {
    console.log("returning early due to null condn");
    return null;
  }
  return (
    <Grid
      className={classes.grid}
      container
      direction="column"
      justify="space-around"
      alignItems="center"
    >
      {words.map((w, i) => {
        return (
          <Grid item xs={12} className={classes.gridItem}>
            <WordCartItem removeWord={removeWord} wordInfo={w} key={i} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default WordCart;
