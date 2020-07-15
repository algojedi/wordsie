import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AuthContext from '../../contexts/authContext'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import './button-appbar.css'
import { useHistory } from 'react-router-dom'
import api from '../../api/api'
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: '#28536B'
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    title: {
        width: 170,

        marginRight: 'auto',
        padding: 5,
        cursor: 'pointer'
    },
    appName_lower: {
        lineHeight: 1
    }
}))

export default function ButtonAppBar() {
    const classes = useStyles()
    const context = useContext(AuthContext)
    let history = useHistory()

    const signOut = () => {
        //sign out from server side first
        const token = window.sessionStorage.getItem('token')
        if (token) {
            const url = `${api.url}logout`
            axios({
                url,
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token
                }
            }).catch((err) => console.log(err))
        }
        window.sessionStorage.removeItem('token')
        context.setUser(null)
        history.push('/')
    }

    return (
        <div>
            <AppBar elevation={0} className={classes.root} position='static'>
                <Toolbar>
                    <Typography
                        onClick={() => history.push('/')}
                        variant='h6'
                        className={classes.title}
                    >
                        <div className='appName'>Wordsie</div>
                        <Typography className={classes.appName_lower}>
                            The Word App
                        </Typography>
                    </Typography>
                    {context.user ? (
                        <Button color='inherit' onClick={signOut}>
                            Sign out
                        </Button>
                    ) : (
                        <Button
                            color='inherit'
                            onClick={() => history.push('/signin')}
                        >
                            Sign in
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    )
}
