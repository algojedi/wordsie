import React, { useState, useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import AccountCircle from '@material-ui/icons/AccountCircle'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import MailIcon from '@material-ui/icons/Mail'
import AssessmentIcon from '@material-ui/icons/Assessment'
import { useHistory, Link } from 'react-router-dom'
import authContext from '../../contexts/authContext'
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
        flexGrow: 1
    },
    list: {
        width: 250
    },
    fullList: {
        width: 'auto'
    }
}))

export default function ButtonAppBar() {
    const classes = useStyles()
    const history = useHistory()
    const { user, setUser } = useContext(authContext)
    const [openDrawer, setOpenDrawer] = useState(false)
    const [anchorEl, setAnchorEl] = React.useState(null)
    const openProfile = Boolean(anchorEl)

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
        setUser(null)
        history.push('/')
    }

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const toggleDrawer = (toggle) => (event) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return
        }
        setOpenDrawer(toggle)
    }

    const sideList = () => (
        <div
            className={classes.list}
            role='presentation'
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                {user ? (
                    <DrawerItem text='Quiz' icon={<AssessmentIcon />} />
                ) : null}
                <DrawerItem text='Contact' icon={<MailIcon />} />
            </List>
        </div>
    )

    const DrawerItem = ({ text, icon }) => (
        <ListItem button>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={text} />
        </ListItem>
    )

    return (
        // <div className={classes.root}>
        <AppBar elevation={0} className={classes.root} position='static'>
            <Toolbar>
                <div>
                    <IconButton
                        onClick={toggleDrawer(true)}
                        edge='start'
                        className={classes.menuButton}
                        color='inherit'
                        aria-label='menu'
                    >
                        <MenuIcon />
                    </IconButton>
                    <SwipeableDrawer
                        open={openDrawer}
                        onClose={toggleDrawer(false)}
                        onOpen={toggleDrawer(true)}
                    >
                        {sideList()}
                    </SwipeableDrawer>
                </div>
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

                {user && (
                    <div>
                        <IconButton
                            aria-label='account of current user'
                            aria-controls='menu-appbar'
                            aria-haspopup='true'
                            onClick={handleMenu}
                            color='inherit'
                        >
                            <AccountCircle />
                        </IconButton>
                        <Menu
                            id='menu-appbar'
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right'
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right'
                            }}
                            open={openProfile}
                            onClose={handleClose}
                        >
                            <MenuItem
                                onClick={() => {
                                    handleClose()
                                    history.push('/account')
                                }}
                            >
                                Profile
                            </MenuItem>
                            <MenuItem onClick={signOut}>Sign Out</MenuItem>
                        </Menu>
                    </div>
                )}
            </Toolbar>
        </AppBar>
        //  </div>
    )
}

// import React, { useContext } from 'react'
// import { makeStyles } from '@material-ui/core/styles'
// import AuthContext from '../../contexts/authContext'
// import AppBar from '@material-ui/core/AppBar'
// import Toolbar from '@material-ui/core/Toolbar'
// import Typography from '@material-ui/core/Typography'
// import Button from '@material-ui/core/Button'
// import './button-appbar.css'

// const useStyles = makeStyles((theme) => ({
//     root: {
//         flexGrow: 1,
//         backgroundColor: '#28536B'
//     },
//     menuButton: {
//         marginRight: theme.spacing(2)
//     },
//     title: {
//         width: 170,

//         marginRight: 'auto',
//         padding: 5,
//         cursor: 'pointer'
//     },
//     appName_lower: {
//         lineHeight: 1
//     }
// }))

// export default function ButtonAppBar() {
//     const classes = useStyles()
//     const context = useContext(AuthContext)
//     let history = useHistory()

//     return (
//         <div>
//             <AppBar elevation={0} className={classes.root} position='static'>
//                 <Toolbar>
//                     <Typography
//                         onClick={() => history.push('/')}
//                         variant='h6'
//                         className={classes.title}
//                     >
//                         <div className='appName'>Wordsie</div>
//                         <Typography className={classes.appName_lower}>
//                             The Word App
//                         </Typography>
//                     </Typography>
//                     {context.user ? (
//                         <Button color='inherit' onClick={signOut}>
//                             Sign out
//                         </Button>
//                     ) : (
//                         <Button
//                             color='inherit'
//                             onClick={() => history.push('/signin')}
//                         >
//                             Sign in
//                         </Button>
//                     )}
//                 </Toolbar>
//             </AppBar>
//         </div>
//     )
// }

// -----

// const fullList = () => (
//     <div
//         className={classes.fullList}
//         role='presentation'
//         onClick={toggleDrawer(false)}
//         onKeyDown={toggleDrawer(false)}
//     >
//         <List>
//             {['Inbox', 'Starred', 'Send email', 'Drafts'].map(
//                 (text, index) => (
//                     <ListItem button key={text}>
//                         <ListItemIcon>
//                             {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
//                         </ListItemIcon>
//                         <ListItemText primary={text} />
//                     </ListItem>
//                 )
//             )}
//         </List>
//         <Divider />
//         <List>
//             {['All mail', 'Trash', 'Spam'].map((text, index) => (
//                 <ListItem button key={text}>
//                     <ListItemIcon>
//                         {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
//                     </ListItemIcon>
//                     <ListItemText primary={text} />
//                 </ListItem>
//             ))}
//         </List>
//     </div>
// )
