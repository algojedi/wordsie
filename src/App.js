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
    const token = window.sessionStorage.getItem("token");
    const url = "http://localhost:3001/login"; //TODO: change when deploying
    const getUsrUrl = "http://localhost:3001/profile/"; //TODO: change when deploying

    if (token) {
      
      axios({
        url,
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        }
      })
        .then(resp => {
          if (resp.data) {
            //token exists in DB   
            //fetch user from another api endpoint
            
            fetch(getUsrUrl + resp.data.userId, { //fetch is working fine
              method: "get",
              headers: {
                "Content-Type": "application/json",
                "Authorization": token
              }
            })

              .then(data => data.json())
              .then(user => {
                //console.log("user from fetch", user);
                if (user && user.email) {
                  context.setAuthenticated(true);
                  const { name, email, _id, cart } = user;
                  context.setUser( { name , email, _id } );
                  context.renewCart({ cart });
                  //console.log('user set from useEffect: ', resp.data);
                } else {
                  context.setAuthenticated(false);
                  console.log("auth denied from useEffect");
                }
              });
          }
        })
        .catch(err => {
          console.log('error when trying to fetch: ',err);

        });
    }
  },[])
  
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
