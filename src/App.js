import React, { useContext, useEffect } from 'react';
//import logo from './logo.svg';
import './App.css';
import SearchAppBar from './components/searchbar/searchbar'
import SignIn from './components/sign-in/signin';
import Register from './components/sign-in/register';
import Main from './pages/main/main'
import { Switch, Route, Redirect } from 'react-router-dom';
import AuthContext from "./contexts/authContext";
import axios from "axios";


function App() {
  
  const context = useContext(AuthContext);

  useEffect(() => {
    const token = window.sessionStorage.getItem('token');
    
    const url = "http://localhost:3001/login"; //TODO: change when deploying
    
    if (token) {
      fetch(url, {
        method: 'post',
        headers: {
          'Content-type:': 'application/json',
          'Authorization': token
        }
      })
      .then(resp => { 
        console.log('resp received by useEffect', resp);
        if (resp.data) { //TODO: this needs to fetch user from another endpoint
          context.setAuthenticated(true);
          context.setUser(resp.data);
          //console.log('user set from useEffect: ', resp.data);
        } else {
          context.setAuthenticated(false);
          console.log('auth denied from useEffect');
        }
      })
      .catch(err => {
        console.log(err);
        //'response' in err ? console.log(err.response.data.message) : 
      })
    }  
  },[])
  
  console.log('context authenticated?: ', context.authenticated);

  return (
    <div className="App">
      <SearchAppBar/>
      <Switch>
        <Route exact path='/' >
          {context.authenticated ? < Main /> : < SignIn /> }
        </Route> 
        <Route path='/register' component={Register}/>

      </Switch>
      
    </div>
  );
}

export default App;
