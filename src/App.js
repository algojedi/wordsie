import React, { useContext, useEffect } from 'react';
import './App.css';
import ButtonAppBar from './components/appbar/button-appbar';
import SignIn from './pages/sign-in-register/signin';
import Register from './pages/sign-in-register/register';
import Welcome from './pages/welcome/welcome';
import Account from './pages/account/account';
import Main from './pages/main/main';
import { Switch, Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import AuthContext from './contexts/authContext';
import CartContext from './contexts/cartContext';
import api from './api/api';
import FourZeroFour from './pages/404/404';
import Quiz from './pages/quiz/quiz';
import axios from 'axios';

function App() {
  const context = useContext(AuthContext);
  const cartContext = useContext(CartContext);
  const fetchUser = async (token) => {
    try {
      const getUsrUrl = `${api.url}profile/`;
      const { data: user } = await axios.get(getUsrUrl);
      if (user && user.email) {
        console.log('refreshed user via useEffect');
        const { name, email, _id, cart } = user;
        context.setUser({ name, email, _id });
        cartContext.setCart(cart);
      }
    } catch (error) {
      console.log('unable to authenticate: ', error.message);
      return;
    }
  };

  useEffect(() => {
    if (!context.user) {
      fetchUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log({ user: context.user });

  return (
    <div className='App'>
      <ButtonAppBar />
      <Switch>
        <Route exact path='/' component={Welcome} />
        <Route path='/signin'>
          {context.user ? <Redirect to='/main' /> : <SignIn />}
        </Route>
        <Route path='/main' component={Main} />
        <Route path='/register' component={Register} />
        <Route path='/account' component={Account} />
        <Route path='/quiz' component={Quiz} />
        <Route component={FourZeroFour} />
      </Switch>
    </div>
  );
}

export default App;
