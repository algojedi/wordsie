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

    useEffect(() => {
        const token = window.sessionStorage.getItem('token')

        const url = `${api.url}login`
        const getUsrUrl = `${api.url}profile/`
        if (token) {
            axios({
                url,
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token,
                },
            })
                .then((resp) => {
                    if (resp.data) {
                        //token exists in DB... fetch user from a different api endpoint
                        fetch(getUsrUrl + resp.data.userId, {
                            method: 'get',
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: token,
                            },
                        })
                            .then((data) => data.json())
                            .then((user) => {
                                if (user && user.email) {
                                    context.setAuthenticated(true)
                                    const { name, email, _id, cart } = user
                                    context.setUser({ name, email, _id })
                                    context.renewCart({ cart })
                                } else {
                                    context.setAuthenticated(false)
                                }
                            })
                    }
                })
                .catch((err) => {
                    console.log('error when trying to fetch: ', err)
                })
        }
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
