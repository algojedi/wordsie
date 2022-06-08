import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './contexts/authContext';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';
import { CartContextProvider } from './contexts/cartContext';
import { saveTokensInSession } from './util/tokens';
import axios from 'axios';
import api from './api/api';

const theme = createMuiTheme({
  palette: {
    info: {
      contrastText: 'white',
      main: '#c2a878', //light brown
      dark: '#b08e4f',
    },
    primary: {
      main: blue[900],
    },
  },
});

/* axios interceptors */
// TODO: apply to only certain routes

// intercept the request and add the token to the header
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    console.log('token retrieved by interceptor: ', token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers.contentType = 'application/json';
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

let counter = 0; // just added as a precaution to prevent infinite loop

// intercept the response and retry if the token is expired
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;
    // TODO: change on server side to send 401 instead, and handle in here
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refreshToken');
      counter++;
      if (counter > 2) {
        console.log('counter exceeded');
        counter = 0
        return Promise.reject(error);
      }
      console.log( { refreshToken })
        // use fetch to avoid infinite loop
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
      return (
        fetch(`${api.url}refresh`, {
          method: 'POST',
          headers: myHeaders,
          mode: 'cors',
          body: JSON.stringify({ refreshToken }),
        }).then(result => result.json())
          // axios
          //     .post(`${api.url}refresh`, { refreshToken })
          .then((response) => {
            // const tokens = JSON.parse(res.text);
            console.log({ response }); // response.token is access token
            // saveTokensInSession(response.data.accessToken, response.data.refreshToken);
            const { token } = response
            if (!token) throw new Error('no token returned');
            window.localStorage.setItem('accessToken', token);
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axios(originalRequest);
          })
         /* let components handle the error  
         .catch((err) => {
            console.log(err.message);
            }) */
      );
    } else {
      return Promise.reject(error);
    }
  },
);

ReactDOM.render(
  <BrowserRouter>
    <MuiThemeProvider theme={theme}>
      <AuthContextProvider>
        <CartContextProvider>
          <App />
        </CartContextProvider>
      </AuthContextProvider>
    </MuiThemeProvider>
  </BrowserRouter>,
  document.getElementById('root'),
);

serviceWorker.register();
