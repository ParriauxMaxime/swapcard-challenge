import React from 'react';
import Toolbar from 'material-ui/Toolbar';
import AppBar from 'material-ui/AppBar';
import { withRouter } from 'react-router';


export const Appbar = withRouter(() => (
  <AppBar position="static" color="primary">
    <Toolbar>
      <h1>Spotify fetcher</h1>
    </Toolbar>
  </AppBar>
));

export default Appbar;
