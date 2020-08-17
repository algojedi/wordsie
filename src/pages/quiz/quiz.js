import React, { useContext, useState, useRef, useReducer } from 'react'
import context from '../../contexts/cartContext'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import { TextField } from '@material-ui/core'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'
// import shuffle from 'lodash/shuffle'

import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'

// actions for quiz reducer
const ADD_RESPONSE = 'ADD_RESPONSE'

const useStyles = makeStyles((theme) => ({
    container: {
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
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
        margin: theme.spacing(3, 0)
    },
    error: {
        color: theme.palette.secondary.dark,
        fontWeight: 'bolder'
    },
    def: {
        marginBottom: '10px'
    },
    correctDisplay: {
        display: 'flex',
        alignItems: 'center'
    },
    muiIcon: {
        marginLeft: '5px',
        color: 'green'
    },
    title: {
        margin: theme.spacing(3, 0)
    },
    finalScore: {
        margin: theme.spacing(3, 0)
    }
}))
function Question({ def, response, input, setInput, handleResponse }) {
    const classes = useStyles()

    const keyPress = (e) => {
        if (e.keyCode === 13) handleResponse()
    }
    return (
        <Card>
            <CardContent>
                <Typography className={classes.def} color='textSecondary'>
                    {def}
                </Typography>
                <TextField
                    onChange={(e) => {
                        setInput(e.target.value)
                    }}
                    size='small'
                    variant='outlined'
                    onKeyDown={keyPress}
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
    const score = useRef(0)

    const filteredCart = cart.map((item, i) => {
        return {
            word: item.word,
            def: item.definitions[0].definition
        }
    })
    // const quizCart = shuffle(filteredCart)
    const quizCart = filteredCart // quiz cart contains the list of words to test
    if (!quizCart.length) return <h3>No words in cart to test</h3>

    const addResponse = (response) => {
        dispatch({
            type: ADD_RESPONSE,
            payload: { index: questionIndex, response }
        })
    }

    const handleNext = () => {
        if (quizCart.length < questionIndex + 1) {
            return
        }
        // store the user's answer
        addResponse(input.toLowerCase())
        if (quizCart.length === questionIndex + 1) {
            setQuizEnded(true)
            setInput('')
            return
        }
        setQuestionIndex((prev) => prev + 1)
        setInput('')
    }

    let isCorrect
    if (quizEnded) {
        return (
            <div>
                <Container maxWidth='sm' className={classes.container}>
                    <Typography variant='h5' className={classes.title}>
                        Quiz Results
                    </Typography>
                    <Card>
                        <CardContent>
                            {responses.map((resp, i) => {
                                isCorrect =
                                    quizCart[i].word === resp.response
                                        ? true
                                        : false
                                if (isCorrect) {
                                    score.current = score.current + 1
                                }
                                return (
                                    <div key={i}>
                                        <Typography>
                                            {quizCart[i].def}
                                        </Typography>
                                        {isCorrect ? (
                                            <div
                                                className={
                                                    classes.correctDisplay
                                                }
                                            >
                                                <p>{quizCart[i].word}</p>
                                                <CheckCircleOutlineIcon
                                                    className={classes.muiIcon}
                                                />
                                            </div>
                                        ) : (
                                            <div>
                                                <Typography
                                                    className={classes.error}
                                                >
                                                    {resp.response}
                                                </Typography>
                                            </div>
                                        )}
                                        {i + 1 !== quizCart.length ? (
                                            <hr />
                                        ) : null}
                                    </div>
                                )
                            })}
                        </CardContent>
                    </Card>
                    <Typography variant='h5' className={classes.finalScore}>
                        {`Final score is ${score.current}
                        out of ${quizCart.length} 
                        (${Math.round(
                            (score.current / quizCart.length) * 100
                        )}%)`}
                    </Typography>
                    <Link to='main'>
                        <Button
                            className={classes.nextBtn}
                            variant='contained'
                            color='primary'
                        >
                            Back to Word Cart
                        </Button>
                    </Link>
                </Container>
            </div>
        )
    }
    return (
        <React.Fragment>
            <Container maxWidth='sm' className={classes.container}>
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
                        handleResponse={handleNext}
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
