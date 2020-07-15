import React, { useContext, useEffect } from 'react'
import './App.css'
import ButtonAppBar from './components/appbar/button-appbar'
import SignIn from './pages/sign-in-register/signin'
import Register from './pages/sign-in-register/register'
import Welcome from './pages/welcome/welcome'
import Main from './pages/main/main'
import { Switch, Route } from 'react-router-dom'
import AuthContext from './contexts/authContext'
import axios from 'axios'
import api from './api/api'

function App() {
    const context = useContext(AuthContext)

    const fetchUser = async (token) => {
        try {
           
            const getUsrUrl = `${api.url}profile/`
            // token exists in DB... fetch user from a different api endpoint
            // const jsonData = await fetch(getUsrUrl + userId, {
            const jsonData = await fetch(getUsrUrl, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token
                }
            })
            console.log({jsonData})
            const user = await jsonData.json()

            console.log({user})
            if (user && user.email) {
                context.setAuthenticated(true)
                const { name, email, _id, cart } = user
                context.setUser({ name, email, _id })
                context.renewCart({ cart })
            } else {
                context.setAuthenticated(false)
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
                    {context.authenticated ? <Main /> : <SignIn />}
                </Route>
                <Route path='/main' component={Main} />
                <Route path='/register' component={Register} />
            </Switch>
        </div>
    )
}

export default App
