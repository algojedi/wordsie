import React, { useContext, useEffect } from 'react';
//import logo from './logo.svg';
import './App.css';
import ButtonAppBar from './components/appbar/button-appbar'
import SignIn from './pages/sign-in-register/signin';
import Register from './pages/sign-in-register/register';
import Welcome from './pages/welcome/welcome'
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
            
            fetch(getUsrUrl + resp.data.userId, { 
              method: "get",
              headers: {
                "Content-Type": "application/json",
                "Authorization": token
              }
            })

              .then(data => data.json())
              .then(user => {
                if (user && user.email) {
                  context.setAuthenticated(true);
                  const { name, email, _id, cart } = user;
                  context.setUser( { name , email, _id } );
                  context.renewCart({ cart });
                  console.log('cart from useEffect ', cart);
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
      <ButtonAppBar/>
      <Switch>
        <Route exact path='/' component={Welcome}/>
        <Route path='/signin'>
        {context.authenticated ? <Main/> : <SignIn/> }
        </Route>
        <Route path='/main' component={Main} />
        <Route path='/register' component={Register}/>

      </Switch>
      
    </div>
  );
}

export default App;
