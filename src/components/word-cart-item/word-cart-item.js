import React from "react";
import Typography from "@material-ui/core/Typography";
import "./word-cart-item.css";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1)
  },
  wordExample: {
      marginLeft: 20,
      fontStyle: 'italic'
  }

}));
const WordCartItem = ({ wordInfo, removeWord }) => {
  // if (!wordInfo) {
  //     return null;
  // }
  const classes = useStyles();

  return (
  
    <>
      <Grid
      className={classes.grid}
      container
      justify="space-between"
      alignItems="center"
    >
        <Grid item xs={8}>
        <Typography variant="h5" gutterBottom>
            {wordInfo.word}
        </Typography>

        </Grid>
        <Grid item xs={4}
                onClick={() => removeWord(wordInfo._id)}
                >
            <DeleteOutlinedIcon />
        </Grid>
    </Grid>
    

      <Typography variant="body2" gutterBottom>
        {wordInfo.part}
      </Typography>
      {wordInfo.definitions.map((d, i) => {
        return (
          <React.Fragment key={i}>
            <Typography variant="subtitle2" gutterBottom>
              {d.definition}
            </Typography>
            <Typography
              component={"div"}
              className={classes.wordExample}
              variant="body2"
              gutterBottom
            >
              {d.examples.map((ex, i) => {
                return (
                  <Typography key={i} variant="body2" gutterBottom>
                    {ex}
                  </Typography>
                );
              })}
            </Typography>
          </React.Fragment>
        );
      })}
    </>
  );
};

export default WordCartItem;
