import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { BrowserRouter } from 'react-router-dom'
import { AuthContextProvider } from './contexts/authContext'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core'
import { blue } from '@material-ui/core/colors'

const theme = createMuiTheme({
    palette: {
        info: {
            contrastText: 'white',
            main: '#c2a878', //light brown
            dark: '#b08e4f',
        },
        primary: {
            main: blue[900],
        },
    },
})

ReactDOM.render(
    <BrowserRouter>
        <MuiThemeProvider theme={theme}>
            <AuthContextProvider>
                <App />
            </AuthContextProvider>
        </MuiThemeProvider>
    </BrowserRouter>,
    document.getElementById('root')
)

serviceWorker.register()
