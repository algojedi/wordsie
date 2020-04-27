import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import "./welcome.css";
import { Container } from "@material-ui/core";
import light from "../../assets/lightbulb.svg";

const useStyles = makeStyles({
  root: {
    //modifies the card component
    minWidth: 275,
    //height: 500,
    maxWidth: 400,
    borderWidth: 0,
  },
  wrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    //color: "#C2948A",
    lineHeight: 1.5,
    //letterSpacing: 2,
    //fontSize: 14,
  },
  register: {
    padding: 16,
  },
  img: {},
  quote: {
    margin: "12 auto",
    width: 500,
    //align: "center"
  },
  btn: {
    backgroundColor: "#28536B", //slate blue
    color: "white",
    "&:hover": {
      backgroundColor: "#7EA8BE", //lighter blue
    },
  },

  btnSignin: {
    backgroundColor: "#6b4028", //dark red brown
    color: "white",
    "&:hover": {
      backgroundColor: "#a3613d", //lighter red brown
    },
  },
});

const Welcome = ({ history }) => {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  return (
    <div>
      <Container className={classes.wrapper} maxWidth="lg">
        <div className="imgWrapper">
          <img src={light} className="img" alt="light bulb" />
        </div>
        <Card className={classes.root} variant="outlined">
          <CardContent>
            <Typography variant="h4" className={classes.title}>
              word{bull}sie <span className="noun">noun</span>
            </Typography>
            <div className="def">DEFINITION:</div>
            <Typography variant="body1" component="p">
              a site to help increase your vocabulary through active recall to
              commit new words to memory
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              className={classes.btn}
              onClick={() => history.push("/main")}
              size="medium"
            >
              Enter site
            </Button>    
              <Button

              variant="contained"
              className={classes.btnSignin}
              onClick={() => history.push("/signin")}
              size="medium"
            >
           Sign in
            </Button>
       
          </CardActions>
          <Typography className={classes.register}>
            Don't have an account?{" "}
            <span onClick={() => history.push("/register")}>Register here</span>
          </Typography>
        </Card>
      </Container>
      <div className="quote">
        <blockquote>
          "Handle them carefully, for words have more power than atom bombs."{" "}
          <br />
          -Pearl Strachan Hurd
        </blockquote>
      </div>
      <footer className="footer">
        <a href="#">Contact Us</a>
      </footer>
    </div>
  );
};

export default Welcome;
