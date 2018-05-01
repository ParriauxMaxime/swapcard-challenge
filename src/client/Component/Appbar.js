import React from 'react';
import Toolbar from 'material-ui/Toolbar';
import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button';
import Searchbar from './Searchbar';
import { withRouter } from 'react-router';


export const Appbar = withRouter(({ logout }) => (
  <AppBar position="static" color="primary">
    <Toolbar>
      <h1>Hello world</h1>
      <Searchbar />
    </Toolbar>
  </AppBar>
));
