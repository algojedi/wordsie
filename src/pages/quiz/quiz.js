import React, { useContext, useState, useRef, useReducer } from 'react'
import context from '../../contexts/cartContext'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import { TextField } from '@material-ui/core'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import shuffle from 'lodash/shuffle'

import { makeStyles } from '@material-ui/core/styles'

// actions for quiz reducer
const ADD_RESPONSE = 'ADD_RESPONSE'

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
    nextBtn: {
        marginTop: theme.spacing(3)
    },
    error: {
        color: theme.palette.secondary.dark
    },
    def: {
        marginBottom: '10px'
    },
    textField: {
        // margin: theme.spacing(2, 0)
        // padding: 0
    },
    title: {
        margin: theme.spacing(3, 0, 2)
    }
}))
function Question({ def, response, input, setInput }) {
    const classes = useStyles()
    return (
        <Card>
            <CardContent>
                <Typography className={classes.def} color='textSecondary'>
                    {def}
                </Typography>
                <TextField
                    onChange={(e) => {
                        // response.current = e.target.value
                        setInput(e.target.value)
                    }}
                    size='small'
                    variant='outlined'
                    className={classes.textField}
                    value={input}
                />
            </CardContent>
        </Card>
    )
}
// state will be array of objects { index, response }
const quizReducer = (state, action) => {
    if (action.type === ADD_RESPONSE) {
        return [
            ...state,
            { index: action.payload.index, response: action.payload.response }
        ]
    } else {
        throw new Error()
    }
}

function Quiz() {
    const classes = useStyles()
    const { cart } = useContext(context)
    const [questionIndex, setQuestionIndex] = useState(0)
    const [quizEnded, setQuizEnded] = useState(false)
    const [input, setInput] = useState('')
    const [responses, dispatch] = useReducer(quizReducer, [])

    const filteredCart = cart.map((item, i) => {
        return {
            word: item.word,
            def: item.definitions[0].definition
            // answer: ''
        }
    })
    // const quizCart = shuffle(filteredCart)
    const quizCart = filteredCart
    if (!quizCart.length) return <h3>No words in cart to test</h3>

    const addResponse = (response) => {
        console.log(`question index ${questionIndex} inside addResponse.. adding ${response}`)
        dispatch({
            type: ADD_RESPONSE,
            payload: { index: questionIndex, response }
        })
    }

    const handleNext = () => {
        if (quizCart.length < questionIndex + 1) {
            console.log('code running that mean out of bounds')
            console.log({ responses })

            return
        }
        // store the user's answer
        addResponse(input)
        if (quizCart.length === questionIndex + 1) {
            setQuizEnded(true)
            setInput('')
            return
        }
        setQuestionIndex((prev) => prev + 1)
        setInput('')
    }
    if (quizEnded) {
        return (
            <div>
                <Container maxWidth='sm'>
                    <h3>All done, quiz!</h3>
                    <Card>
                        <CardContent>
                            {responses.map((resp, i) => {
                                return <h5 key={i}> {resp.response}</h5>
                            })}
                        </CardContent>
                    </Card>
                </Container>
            </div>
        )
    }
    return (
        <React.Fragment>
            <Container maxWidth='sm'>
                <Typography
                    className={classes.title}
                    component='h1'
                    variant='h5'
                >
                    Quiz
                </Typography>
                <div className='quiz-questions'>
                    <Question
                        // response={userResponse}
                        input={input}
                        setInput={setInput}
                        def={quizCart[questionIndex].def}
                    />
                </div>

                <Button
                    className={classes.nextBtn}
                    variant='contained'
                    color='primary'
                    onClick={handleNext}
                >
                    Next
                </Button>
            </Container>
        </React.Fragment>
    )
}

export default Quiz
