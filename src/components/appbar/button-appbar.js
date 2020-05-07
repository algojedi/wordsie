import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AuthContext from "../../contexts/authContext";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import "./button-appbar.css";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#28536B",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    width: 170,

    marginRight: "auto",
    padding: 5,
    cursor: "pointer",
  },
  appName_lower: {
    margin: 0,
    paddding: 0,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const context = useContext(AuthContext);
  let history = useHistory();

  return (
    <div>
      <AppBar elevation={0} className={classes.root} position="static">
        <Toolbar>
          <Typography
            onClick={() => history.push("/")}
            variant="h6"
            className={classes.title}
          >
            <div className="appName">Wordsie</div>
            <Typography className={classes.appName_lower}>
              The Words App
            </Typography>
          </Typography>
          {context.authenticated ? (
            <Button
              color="inherit"
              onClick={() => {
                context.signOut();
                history.push("/");
              }}
            >
              Sign out
            </Button>
          ) : (
            <Button color="inherit" onClick={() => history.push("/signin")}>
              Sign in
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
