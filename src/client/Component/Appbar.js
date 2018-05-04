import React from 'react';
import Toolbar from 'material-ui/Toolbar';
import Grid from 'material-ui/Grid';
import AppBar from 'material-ui/AppBar';
import { withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';


const Appbar = ({ classes }) => (
  <AppBar position="static" color="primary">
    <Toolbar>
      <Grid container spacing={8}>
        <Grid item xs={8} sm={10}>
          <Typography variant="display1" color="secondary">Spotify fetcher</Typography>
        </Grid>
        <Grid item xs={4} sm={2} className={classes.linkGroup}>
          <NavLink
            exact
            className={classes.link}
            activeClassName={classes.active}
            to="/"
            children="Home"
          />
          &nbsp;&nbsp;&nbsp;
          <NavLink
            activeClassName={classes.active}
            className={classes.link}
            to="/about"
            children="About"
          />
        </Grid>
      </Grid>
    </Toolbar>
  </AppBar>
);

const style = theme => ({
  link: {
    color: 'rgba(255, 255, 255, 0.8)',
    textDecoration: 'none',
  },
  linkGroup: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  active: {
    color: 'rgba(255, 255, 255, 1)',
    textDecoration: 'underline',
  },
});

export default withRouter(withStyles(style)(Appbar));
