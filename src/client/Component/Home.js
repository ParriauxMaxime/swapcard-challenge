import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export const Home = () => {
  return (
    <div>
    <h1>Hello world</h1>
    </div>
  );
};

Home.propTypes = {
};

export const homeState = ({}) => ({});

export const homeDispatch = dispatch => ({
});

export const ConnectedHome = connect(homeState, homeDispatch)(Home);