import React, { useState, useContext } from "react";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Copyright from "../copyright/copyright";
import AuthContext from "../../contexts/authContext";
import axios from "axios";




const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

// const saveTokenInSession = token => {
//   window.sessionStorage.setItem("token", token);
// };

const Register = ({ history }) => {
  const classes = useStyles();

  const context = useContext(AuthContext);

  const url = "http://localhost:3001/register";

  //const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      //const result = await axios.post(url, { name: 'Jake', email, password }); //for registering
      const result = await axios.post(url, { name, email, password });
      console.log("response received in sign in page ", result);

      //------- currently not signing in user after registering ... need to fix
      //if (result.data && result.data.success) {
      if (result.status === 200) {
        //TODO: context.setAuthenticated(true);
        history.push("/main");
        //context.setUser(result.data);
        //TODO : so far only sign in page receiving tokens ....saveTokenInSession(result.data.token)
      } else {
        //TODO: password/email didn't match
        context.setAuthenticated(false);
      }
    } catch (err) {
      console.log(err);
      //'response' in err ? console.log(err.response.data.message) : console.log(err);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                autoComplete="name"
                name="name"
                variant="outlined"
                required
                fullWidth
                // id="name"
                label="Name"
                value={name}
                onChange={e => setName(e.target.value)}
                autoFocus
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                // id="email"
                value={email}
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={e => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                // id="password"
                onChange={e => setPassword(e.target.value)}
                value={password}
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link variant="body2" component={RouterLink} to="/">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default Register;