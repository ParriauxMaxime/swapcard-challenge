import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withTheme } from "material-ui/styles";
import { ConnectedBasicOutput } from './BasicOutput';
import { Appbar } from './Appbar';
import { spotifyActions } from '../Api/spotify';

export const Home = ({theme, logout}) => {
  return (
    <React.Fragment>
      <Appbar logout={logout}/>
      <div style={theme.mixins.margin()}>
        <ConnectedBasicOutput />
      </div>
    </React.Fragment>
  );
};

Home.propTypes = {
};

export const homeState = ({}) => ({});

export const homeDispatch = dispatch => ({
  
});




export const ConnectedHome = connect(homeState, spotifyActions)(withTheme()(Home));