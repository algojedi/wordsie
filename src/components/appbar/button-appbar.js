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
    backgroundColor: "#28536B"
    //elevation: 0
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    padding: 5,
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
          {/* ay not need hamburger menu pullout...
            <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" className={classes.title}>
            <div className="appName">Wordsie</div>
            <Typography className="appName_lower">The Words App</Typography>
          </Typography>
          {context.authenticated ? (
            <Button
              color="inherit"
              onClick={() => context.setAuthenticated(false)}
            >
              Logout
            </Button>
          ) : (
            <Button
              color="inherit"
              onClick={() => history.push("/signin")}
            >
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
