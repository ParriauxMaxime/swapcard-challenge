import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import CssBaseline from 'material-ui/CssBaseline';
import { connect } from "react-redux";
import { Switch, Route } from 'react-router';

import { About } from "./Component/About";
import ConnectedHome from "./Component/Home";
import { Appbar } from './Component/Appbar';
import { spotifyActions } from './Api/spotify';
import Spotify from './Api/spotify';
import ConnectedAlbumView from './Component/AlbumView';

const App = (props) => {
  if (props.accessToken) {
    console.log(props.accessToken)
    Spotify.setAccessToken(props.accessToken)
  }
  return (
    <div>
      <CssBaseline />
      <Appbar />
      <Switch>
        <Route path="/about" component={About} />
        <Route path="/home" component={ConnectedHome} />
        <Route path="/album/:id" component={ConnectedAlbumView} />
        <Route path="/" component={ConnectedHome} />
        <Route render={() => <Redirect to="/" />} />
      </Switch>
    </div>
  )
};

const appState = ({ spotify, router }) => ({
  ...spotify,
  ...router
})
const ConnectedApp = connect(appState, spotifyActions)(App);

class Main extends React.Component {
  // Remove the server-side injected CSS.
  componentDidMount() {
    const jssStyles = document.getElementById('jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    return <ConnectedApp {...this.props} />
  }
}


export default Main;
