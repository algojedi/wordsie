
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import "./404.css";
import { Container } from "@material-ui/core";
import light from "../../assets/lightbulb.svg";

const useStyles = makeStyles(theme => ({

  root: {
    //modifies the card component
    minWidth: 275,
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

const FourZeroFour = ({history, theme }) => {
  const classes = useStyles(theme);
  return (
    <div>
      <Container className={classes.wrapper} maxWidth="lg">
        <div className="imgWrapper">
          <img src={light} className="img" alt="light bulb" />
        </div>
        <Card className={classes.root} variant="outlined">
          <CardContent>
            <Typography variant="h4" className={classes.title}>
              404 <span className="noun">noun</span>
            </Typography>
            <div className="def">DEFINITION:</div>
            <Typography variant="body1" component="p">
            A Hypertext Transfer Protocol (HTTP) standard response code, in computer network communications, to indicate that the browser was able to communicate with a given server, but the server could not find what was requested.
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              className={classes.btn}
              onClick={() => history.push("/")}
              size="medium"
            >
            Go Back
            </Button>
            
          </CardActions>
          
        </Card>
      </Container>
    </div>
  );
};

export default FourZeroFour
