import React, { useState, useContext, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import AuthContext from '../../contexts/authContext';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import WordDefinition from '../../components/word-def/word-def';
import WordCart from '../../components/word-cart/word-cart';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import Box from '@material-ui/core/Box';
import { useHistory } from 'react-router-dom';
import { TextField } from '@material-ui/core';
import AlertDialog from '../../components/alert/delete-alert';
import './main.css';
import api from '../../api/api';
import CartContext from '../../contexts/cartContext';

const styles = (theme) => ({
  searchbarContainer: {
    display: 'flex',
    alignItems: 'center',
    minWidth: 275,
    maxWidth: 500,
    margin: 15,
  },
  listTitle: {
    padding: 24, // the padding applied to expansion panels by default
    paddingBottom: 8,
    color: '#a3613d',
    [theme.breakpoints.down('xs')]: {
      fontSize: 16,
      fontWeight: 'bold',
    },
  },
  guestMsg: {
    padding: 24, // the padding applied to expansion panels by default
    color: '#a3613d',
    cursor: 'pointer',
    display: 'inline-block',
    fontSize: 14,
  },
  removeListBtn: {
    border: 'none',
  },
  listTitleContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0px 24px',
  },
  root: {
    display: 'flex',
    background: '#28536B',
    flexGrow: 1,
    maxWidth: '100%',
    padding: 0,
    margin: 0,
    justifyContent: 'center',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
});

//classes coming from withStyles HOC
const Main = ({ classes }) => {
  const history = useHistory();
  const cartContext = useContext(CartContext);
  const context = useContext(AuthContext);
  //word is the current word to search
  const [word, setWord] = useState('');
  //wordInfo is the word information retrieved from api or db
  const [wordInfo, setWordInfo] = useState({}); //includes word, part, definitions
  //showDefinition controls whether word definition (wordInfo) is displayed
  const [showDefinition, setShowDefinition] = useState(false);
  const [invalidEntry, setInvalidEntry] = useState(false);
  //state to track whether use should be allowed to enter the displayed word into cart
  const [invalidCartEntry, setInvalidCartEntry] = useState(true);
  const wordSearchUrl = `${api.url}word?word=`;


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (word === '') {
      setInvalidEntry(true);
      return;
    }
    try {
      const result = await axios.get(wordSearchUrl + word);
      if (result.data && result.status === 200) {
        setWordInfo(result.data);
        setShowDefinition(true);
        setInvalidEntry(false);
        setInvalidCartEntry(false);
        setWord('');
      }
    } catch (err) {
      setInvalidEntry(true);
      if (err.status === 401) {
        console.log({ err });
        context.setUser(null);
      }
    }
  };

  const addToCartUrl = `${api.url}word`;
  const handleAddToCart = async () => {
    try {
      if (invalidCartEntry) return;
      const result = await axios({
        url: addToCartUrl,
        method: 'POST',
        data: {
          word: wordInfo.word,
        },
      });
      if (result.data && result.status === 200) {
        cartContext.addWordToCart(result.data);
        setInvalidCartEntry(true); //user can not continually add same word
        setShowDefinition(false);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <React.Fragment>
      <Container className={classes.root} component='main'>
        <Paper component='form' className={classes.searchbarContainer}>
          <TextField
            className={classes.input}
            placeholder='Word Search'
            error={invalidEntry}
            value={word}
            onChange={(e) => setWord(e.target.value)}
          />

          <IconButton
            type='submit'
            onClick={handleSubmit}
            noValidate
            className={classes.iconButton}
            aria-label='search'
          >
            <SearchIcon />
          </IconButton>
        </Paper>
      </Container>
      <Paper component='div' className='mainContainer'>
        {showDefinition ? (
          <WordDefinition
            addToCartBtn={() => {
              return (
                <Button
                  onClick={handleAddToCart}
                  variant='contained'
                  color='primary'
                  disabled={invalidCartEntry}
                  className={classes.submit}
                >
                  Add to My List
                </Button>
              );
            }}
            wordInformation={wordInfo}
          />
        ) : null}
        {context.user ? (
          <>
            <Box className={classes.listTitleContainer}>
              <Typography
                className={classes.listTitle}
                variant='h5'
                gutterBottom
              >
                Your Word List
              </Typography>
              { cartContext.cart.length > 0 ? <AlertDialog /> : null}
            </Box>
            <WordCart words={cartContext.cart} />
          </>
        ) : (
          <Typography
            className={classes.guestMsg}
            onClick={() => history.push('/signin')}
            variant='h5'
            gutterBottom
          >
            Sign in required to a save word list
          </Typography>
        )}
      </Paper>
    </React.Fragment>
  );
};

export default withStyles(styles)(Main);
