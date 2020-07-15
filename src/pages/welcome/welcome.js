import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import "./welcome.css";
import { Container } from "@material-ui/core";
import light from "../../assets/lightbulb.svg";
import AuthContext from "../../contexts/authContext";

const useStyles = makeStyles(theme => ({

  //const styles = theme => ({
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
    lineHeight: 1.5,
  },
  register: {
    padding: 16,
  },
  img: {},
  quote: {
    margin: "12 auto",
    width: 500,
  },
  btn: {
    backgroundColor: theme.palette.info.main,

    color: "white",
    "&:hover": {
      backgroundColor: theme.palette.info.dark,
    },
  },
  btnSignin: {
    backgroundColor: "#876d3d",
    color: "white",
    "&:hover": {
      backgroundColor: "#6c5731",
    },
  },
}));

const Welcome = ({ history, theme }) => {
  const classes = useStyles(theme);
  const context = useContext(AuthContext);
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
              //color="secondary"
            >
              Enter site
            </Button>
            {context.user ? null : (
              <Button
                variant="contained"
                className={classes.btnSignin}
                onClick={() => history.push("/signin")}
                size="medium"
              >
                Sign in
              </Button>
            )}
          </CardActions>
          {context.user ? null : (
            <Typography className={classes.register}>
              Don't have an account?{" "}
              <span
                className="register-link"
                onClick={() => history.push("/register")}
              >
                Register here
              </span>
            </Typography>
          )}
        </Card>
      </Container>
      <div className="quote">
        <blockquote>
          "Handle them carefully, for words have more power than atom bombs."{" "}
          <br />
          -Pearl Strachan Hurd
        </blockquote>
      </div>
      {/* <footer className="footer">
        <a href="#">Contact Us</a>
      </footer> */}
    </div>
  );
};

export default Welcome;
