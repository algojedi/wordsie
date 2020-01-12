import React, {useContext} from 'react';
//import logo from './logo.svg';
import './App.css';
import SearchAppBar from './components/searchbar/searchbar'
import SignIn from './components/sign-in/signin';
import Register from './components/sign-in/register';
import Main from './pages/main/main'
import { Switch, Route, Redirect } from 'react-router-dom';
import AuthContext from "./contexts/authContext";



function App() {
  
  const context = useContext(AuthContext);

  return (
    <div className="App">
      <SearchAppBar/>
      <Switch>
        <Route exact path='/' >
          {context.isAuthenticated ? < Main /> : < SignIn /> }
        </Route> 
        <Route path='/register' component={Register}/>

      </Switch>
      
    </div>
  );
}

export default App;
