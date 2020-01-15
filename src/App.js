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
    const url = "http://localhost:3001/checkauth";
    
    axios.get(url)
      .then(resp => { 
        console.log('resp received by useEffect', resp);
        if (resp.data) {
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
