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
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refreshToken');
      counter++;
      if (counter > 2) {
        console.log('counter exceeded');
        counter = 0;
        return Promise.reject(error);
      }
      // use fetch to avoid infinite loop
      var myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      const result = await fetch(`${api.url}refresh`, {
        method: 'POST',
        headers: myHeaders,
        mode: 'cors',
        body: JSON.stringify({ refreshToken }),
      });
      const response = result.json();
      const { token } = response;
      if (!token) {
        const tokenErr = new Error('no token returned');
        tokenErr.status = 401;
        return Promise.reject(tokenErr);
      }
      window.localStorage.setItem('accessToken', token);
      originalRequest.headers.Authorization = `Bearer ${token}`;
      // retry the request with new token set
      return axios(originalRequest);
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
