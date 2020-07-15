import React from "react";

//import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    paddingRight: 9,
    paddingLeft: 9
  },
  title: {
    fontSize: 14
  },
  wordExample: {
    fontWeight: 'normal',
    fontStyle: "italic"
  
  },
  definition: {
    fontWeight: 'bold',
    marginTop: 10
  },
  pos: {
    marginBottom: 12
  }
});

const WordDefinition = ({ wordInformation, addToCartBtn }) => {
  const classes = useStyles();
  const { definitions } = wordInformation;

  const defsToDisplay = definitions.map((item, i) => {
    return (
      <Typography
        className={classes.definition}
        key={i}
        variant="body2"
        component="div"
      >
        {item.definition}

        <br />
        {item.examples.map((ex, i) => (
          <li className={classes.wordExample} key={i}>
            {ex}
          </li>
        ))}
      </Typography>
    );
  });

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {wordInformation.word}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {wordInformation.part.toLowerCase()}
        </Typography>
        {defsToDisplay}
      </CardContent>
      <CardActions>
        {addToCartBtn()}
        
      </CardActions>
    </Card>
  );
};

export default WordDefinition;

