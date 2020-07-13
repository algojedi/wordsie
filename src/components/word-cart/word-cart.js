import React, { useContext } from "react";
import AuthContext from "../../contexts/authContext";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Divider from "@material-ui/core/Divider";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import Button from "@material-ui/core/Button";
import api from "../../api/api"
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginBottom: 50,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    //styles the 'part' of the word
    fontSize: theme.typography.pxToRem(15),
    color: "#C2A878", // color of part
  },
  definition: {
    //margin: 5,
    padding: theme.spacing(1, 0),
  },
  example: {
    padding: theme.spacing(0, 2),
    fontStyle: "italic",
  },
  number: {
    color: "#C2A878",
    marginRight: 8, 
    fontWeight: "bold",
  },
  details: {
    flexDirection: "column",
    backgroundColor: "#F1F5F2",
  },
  wordItem: {
    display: "flex",
    flexDirection: "column",
  },
  removeBtn: {
    display: "flex",
    color: theme.palette.secondary.dark, //"white",
    alignItems: "center",
    justifyContent: "center",
  },
  trash: {
    padding: theme.spacing(2, 2),
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#F1F5F2",
  },
}));

//words parameter are all the words in the list
export default function WordCart({ words }) {
  const context = useContext(AuthContext);
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  if (!context.authenticated) return null;

  const handleRemove = async (wordId) => {
    //remove word from db

    const url = `${api.url}removeWord`;
    try {
      const token = window.sessionStorage.getItem("token");

      if (!token) {
        //return early if no token
        console.log("missing token from session. Can't remove word");
        return;
      }
      const result = await axios({
        url,
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        data: {
          //data gets received as body
          wordId,
        },
      });
      if (result.status === 200) {
        context.removeWordFromCart(wordId);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (panel) => (event, isExpanded) => {
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
                    <div className={classes.wordItem}>
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
                  </div>
                );
              })}
            </ExpansionPanelDetails>
            <div className={classes.trash}>
              <Button
                onClick={() => handleRemove(w._id)}
                variant="outlined"
                color="secondary"
                className={classes.removeBtn}
              >
                <div>Remove</div>
                <DeleteOutlinedIcon />
              </Button>
            </div>
          </ExpansionPanel>
        );
      })}
    </div>
  );
}
