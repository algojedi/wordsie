import React, { useState, useContext } from 'react'
import Paper from '@material-ui/core/Paper'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import { Link as RouterLink } from 'react-router-dom'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Copyright from '../../components/copyright/copyright'
import AuthContext from '../../contexts/authContext'
import axios from 'axios'
import api from '../../api/api'
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
        marginTop: theme.spacing(3)
    },
    error: {
        color: theme.palette.secondary.dark
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    }
}))

const Register = ({ history }) => {
    const classes = useStyles()
    const cartContext = useContext(CartContext)
    const context = useContext(AuthContext)

    const url = `${api.url}register`
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [errorMsg, setErrorMsg] = useState('')

    const validateInput = () => {
        if (name === '' || email === '' || password === '') {
            setErrorMsg('fields must not be blank')
            return false
        }
        if (password.length < 4) {
            setErrorMsg('password must be at least 4 characters long')
            return false
        }
        return true
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const validInput = validateInput()
            if (!validInput) return
            const result = await axios.post(url, { name, email, password })
            if (result.status === 200) {
                //id of new user returned in reponse, as well as token
                const { id, token } = result.data
                window.sessionStorage.setItem('token', token)
                setErrorMsg('')
                context.setUser({ name, email, _id: id })
                cartContext.setCart([])
                history.push('/main')
            } else {
            }
        } catch (err) {
            const {
                data: { error }
            } = err.response
            error && typeof error.message === 'string'
                ? setErrorMsg(error.message)
                : setErrorMsg('invalid username or password')
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
                    Sign up
                </Typography>
                <form
                    className={classes.form}
                    onSubmit={handleSubmit}
                    noValidate
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                autoComplete='name'
                                name='name'
                                variant='outlined'
                                required
                                fullWidth
                                // id="name"
                                label='Name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                autoFocus
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                variant='outlined'
                                required
                                type='email'
                                fullWidth
                                value={email}
                                label='Email Address'
                                name='email'
                                autoComplete='email'
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant='outlined'
                                required
                                fullWidth
                                name='password'
                                label='Password'
                                type='password'
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                autoComplete='current-password'
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        color='primary'
                        className={classes.submit}
                    >
                        Sign Up
                    </Button>
                    <Grid container justify='flex-end'>
                        <Grid item>
                            <Link
                                variant='body2'
                                component={RouterLink}
                                to='/signin'
                            >
                                Already have an account? Sign in
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
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    )
}

export default Register
