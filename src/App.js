import React, { useContext, useEffect } from 'react'
import './App.css'
import ButtonAppBar from './components/appbar/button-appbar'
import SignIn from './pages/sign-in-register/signin'
import Register from './pages/sign-in-register/register'
import Welcome from './pages/welcome/welcome'
import Account from './pages/account/account'
import Main from './pages/main/main'
import { Switch, Route } from 'react-router-dom'
import AuthContext from './contexts/authContext'
import CartContext from './contexts/cartContext'
import api from './api/api'
import FourZeroFour from './pages/404/404'
import Quiz from './pages/quiz/quiz'

function App() {
    const context = useContext(AuthContext)
    const cartContext = useContext(CartContext)
    const fetchUser = async (token) => {
        try {
            const getUsrUrl = `${api.url}profile/`
            // token exists in DB... fetch user from a different api endpoint
            const jsonData = await fetch(getUsrUrl, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token
                }
            })
            const user = await jsonData.json()

            if (user && user.email) {
                const { name, email, _id, cart } = user
                context.setUser({ name, email, _id })
                cartContext.setCart(cart)
            } 
        } catch (error) {
            console.log(error.message)
            return
        }
    }
    useEffect(() => {
        const token = window.sessionStorage.getItem('token')
        if (!token) return
        fetchUser(token)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className='App'>
            <ButtonAppBar />
            <Switch>
                <Route exact path='/' component={Welcome} />
                <Route path='/signin'>
                    {context.user ? <Main /> : <SignIn />}
                </Route>
                <Route path='/main' component={Main} />
                <Route path='/register' component={Register} />
                <Route path='/account' component={Account}/> 
                <Route path='/quiz' component={Quiz}/>
                <Route component={FourZeroFour} />
                
            </Switch>
        </div>
    )
}

export default App
