import React, { useState, useContext } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import { Link as RouterLink } from 'react-router-dom'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import axios from 'axios'
import AuthContext from '../../contexts/authContext'
import Copyright from '../../components/copyright/copyright'
import api from '../../api/api'
import { saveTokensInSession } from '../../util/tokens'
import CartContext from '../../contexts/cartContext'

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1)
    },
    error: {
        color: theme.palette.secondary.dark
    },

    submit: {
        margin: theme.spacing(3, 0, 2)
    }
}))


const SignIn = ({ theme }) => {
    const classes = useStyles(theme)
    const context = useContext(AuthContext)
    const cartContext = useContext(CartContext)
    const url = `${api.url}login`
    const getUsrUrl = `${api.url}profile/`
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    //display error msg when username and password do not match
    const [errorMsg, setErrorMsg] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const result = await axios.post(url, { email, password })
            //if authenticated, save returned token in session storage
            if (result.status !== 200) {
                throw new Error(result.data)
            }

            const { accessToken, refreshToken } = result.data
            saveTokensInSession(accessToken, refreshToken)

            // use token to load user - should go through interceptor 
            const jsonData = await axios(getUsrUrl) 
            /*, { // handled by interceptor
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `bearer ${accessToken}`
                }
            })
            */

            const user = jsonData.data
            if (user && user.email) {
                const { name, email, cart } = user
                setErrorMsg('')
                // TODO: no need to save user id
                context.setUser({ name, email, userId : 99 })
                cartContext.setCart(cart)
            } else {
                setErrorMsg('incorrect username or password')
            }
        } catch (err) {
            setErrorMsg('incorrect username or password')
            console.log(err.message)
        }
    }

    return (
        <Container component='main' maxWidth='xs'>
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component='h1' variant='h5'>
                    Sign in
                </Typography>
                <form
                    className={classes.form}
                    onSubmit={handleSubmit}
                    noValidate
                >
                    <TextField
                        variant='outlined'
                        margin='normal'
                        required
                        fullWidth
                        // id="email"
                        label='Email Address'
                        name='email'
                        autoComplete='email'
                        autoFocus
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        variant='outlined'
                        margin='normal'
                        required
                        fullWidth
                        name='password'
                        label='Password'
                        type='password'
                        // id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete='current-password'
                    />
                    <FormControlLabel
                        control={<Checkbox value='remember' color='primary' />}
                        label='Remember me'
                    />
                    <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        color='primary'
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href='#' variant='body2'>
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link
                                variant='body2'
                                component={RouterLink}
                                to='/register'
                            >
                                Register
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>

            <Box mt={2}>
                <Paper
                    component={'div'}
                    elevation={0}
                    className={classes.error}
                >
                    {errorMsg}
                </Paper>
            </Box>
            <Box mt={6}>
                <Copyright />
            </Box>
        </Container>
    )
}

export default SignIn
