import React, { useContext } from 'react'
import context from '../../contexts/cartContext'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'

import { makeStyles } from '@material-ui/core/styles'

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
function Quiz() {
    const { cart } = useContext(context)
    console.log({ cart })
    return (
        <React.Fragment>
            <Container maxWidth='sm'>
                <Typography component='h1' variant='h5'>
                Quiz
                </Typography>
                <div className="quiz-questions">

                    {cart.map((word, i) => {
                        let { definitions } = word
                        console.log(definitions[0])
                        return <div key={i}> { definitions[0].definition } </div>
                    })}
                </div>

                <Button variant='contained' color='secondary'>
                    Secondary
                </Button>
            </Container>
        </React.Fragment>
    )
}

export default Quiz
