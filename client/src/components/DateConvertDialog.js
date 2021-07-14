import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DateConvertDialog(props) {
  const classes = useStyles();
  
  return (
    <div>
      {/* <Dialog open={props.open} onClose={props.handleClose} TransitionComponent={Transition}> */}
      <Dialog open={props.open} onClose={props.handleClose} >
        {/* <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={props.handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Sound
            </Typography>
            <Button autoFocus color="inherit" onClick={props.handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar> */}
        <List style={{backgroundColor: "#000000", color: "#ffffff",
           position:"fixed", display:"flex", flexDirection:"column",
           left: "0px", top: "10vh", width: "100%", height: "70%", justifyContent: "center"}}>
          <ListItem button onClick={() => props.handleClose("DAY")} style={{textAlign: "center", padding: "2.5vh"}}>
            <ListItemText primary="DAY" />
          </ListItem>
          <ListItem button onClick={() => props.handleClose("WEEK")} style={{textAlign: "center", padding: "2.5vh"}}>
            <ListItemText primary="WEEK" />
          </ListItem>
          <ListItem button onClick={() => props.handleClose("MONTH")} style={{textAlign: "center", padding: "2.5vh"}}>
            <ListItemText primary="MONTH" />
          </ListItem>
          <ListItem button onClick={() => props.handleClose("YEAR")} style={{textAlign: "center", padding: "2.5vh"}}>
            <ListItemText primary="YEAR" />
          </ListItem>
          <ListItem button onClick={() => props.handleClose("LIFETIME")} style={{textAlign: "center", padding: "2.5vh"}}>
            <ListItemText primary="LIFETIME" />
          </ListItem>
        </List>
      </Dialog>
    </div>
  );
}