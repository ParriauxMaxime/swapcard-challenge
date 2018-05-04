import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';

import ArtistSelector from './ArtistSelector';
import AlbumSelector from './AlbumSelector';

export const Home = ({ classes }) => (
  <React.Fragment>
    <Grid container spacing={0} className={classes.root}>
      <Grid item xs={12} sm={4} className={classes.left}>
        <ArtistSelector />
      </Grid>
      <Grid item xs={12} sm={8} className={classes.right}>
        <AlbumSelector />
      </Grid>
    </Grid>
  </React.Fragment>
);

Home.propTypes = {
};

const style = theme => ({
  root: {
    height: '100%',
  },
  left: {
    [theme.breakpoints.up('sm')]: {
      minWidth: 400,
    },
  },
  right: {
  },
});

const styled = withStyles(style)(Home);

const state = ({ router }) => ({ ...router });

const ConnectedHome = connect(state)(styled);

export default ConnectedHome;
