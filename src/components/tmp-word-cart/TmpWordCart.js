
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0
  },
  secondaryHeading: {
    //styles the 'part' of the verb
    fontSize: theme.typography.pxToRem(15),
    //color: theme.palette.text.secondary,
    color: "#C2A878"
  },
  definition: {
    //margin: 5,
    padding: theme.spacing(1, 0)
  },
  example: {
    padding: theme.spacing(0, 2),
    fontStyle: "italic"
  },
  number: {
    color: "#C2A878",
    marginRight: 8, // theme.spacing(0, 1),
    fontWeight: "bold"
  },
  details: {
    flexDirection: "column",
    backgroundColor: '#F1F5F2'
  }
}));

export default function TmpWordCart({ words }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return ( 
      
                <div className={classes.root}>
          {words.map((w, i) => {
            return (
              <ExpansionPanel
                key={i}
                expanded={expanded === w.word}
                onChange={handleChange(w.word)}
              >
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography className={classes.heading}>{w.word}</Typography>
                  <Typography className={classes.secondaryHeading}>
                    {w.part.toLowerCase()}
                  </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={classes.details}>
                  {w.definitions.map((d, j) => {
                    return (
                      <div key={j} className={classes.definition}>
                        <Typography variant="subtitle2" gutterBottom>
                          <span className={classes.number}>{j + 1}</span>
                          {d.definition}
                        </Typography>
                        <Typography
                          component={"div"}
                          variant="body2"
                          gutterBottom
                        >
                          {d.examples.map((ex, k) => {
                            return (
                              <Typography
                                key={k}
                                variant="body2"
                                gutterBottom
                                className={classes.example}
                              >
                                &bull; {ex}
                              </Typography>
                            );
                          })}
                        </Typography>
                        {w.definitions.length > 1 ? <Divider /> : null}
                      </div>
                    );
                  })}
                </ExpansionPanelDetails>
              </ExpansionPanel>
            );
            })}
                </div>
      
    
  )
}


//F1F5F2 off-white
// 14281D dark green
// hunter green 355834
// 6E633D coyote brown - semi dark
// C2A878 - french beige