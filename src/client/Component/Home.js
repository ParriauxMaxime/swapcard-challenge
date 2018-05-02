import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { ConnectedBasicOutput } from './BasicOutput';
import { Appbar } from './Appbar';
import { spotifyActions } from '../Api/spotify';
import ArtistSelector from './ArtistSelector';
import AlbumSelector from './AlbumSelector';

export const Home = ({ classes }) => (
  <React.Fragment>
    <div className={classes.root}>
      <div className={classes.left}>
        <ArtistSelector />
      </div>
      <div className={classes.right}>
        <AlbumSelector />
        <ConnectedBasicOutput />
      </div>
    </div>
  </React.Fragment>
);

Home.propTypes = {
};

const style = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
  },
  left: {
    width: 500,
    minWidth: 300,
  },
  right: {
    flexShrink: 3,
    margin: theme.spacing.unit,
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
  },
});

const styled = withStyles(style)(Home);

const state = ({ router }) => ({ ...router });

const dispatch = dispatch => ({

});

const ConnectedHome = connect(state)(styled);

export default ConnectedHome;
