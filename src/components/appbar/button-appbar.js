import React , { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { useHistory } from 'react-router-dom'
import api from '../../api/api'
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  }
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const [auth, setAuth] = useState(true);
  const [open, setOpen] = useState(false);

  const toggleDrawer = (toggle) => event => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpen(toggle)
  };

  const sideList = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  const fullList = () => (
    <div
      className={classes.fullList}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );
  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    // setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    // setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
        <div>
          <IconButton 
          onClick={toggleDrawer(true)}
          edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
      <SwipeableDrawer
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        {sideList()}
      </SwipeableDrawer>
     
    </div>
          <Typography variant="h6" className={classes.title}>
            Photos
          </Typography>
          {auth && (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
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

//     const signOut = () => {
//         //sign out from server side first
//         const token = window.sessionStorage.getItem('token')
//         if (token) {
//             const url = `${api.url}logout`
//             axios({
//                 url,
//                 method: 'post',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Authorization: token
//                 }
//             }).catch((err) => console.log(err))
//         }
//         window.sessionStorage.removeItem('token')
//         context.setUser(null)
//         history.push('/')
//     }

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
