import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  toolbar: {
    minHeight: 200,
    alignItems: 'center',
    backgroundColor:'rgba(16, 13, 84)',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
    justifyContent:'center'
  },
  title: {
    flexGrow: 1,
     alignSelf: 'center',
     textAlign:'center'
  },
}));

export default function ProminentAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.pallete}>
      <Toolbar className={classes.toolbar}>
      
      <Typography className={classes.title} variant="h3" >
        COVID-19 Tracker App
      </Typography>
      
    </Toolbar>
      </AppBar>
    </div>
  );
}