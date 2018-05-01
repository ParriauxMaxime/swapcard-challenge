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

const HelloWorld = () => <div>Hello world</div>;


const App = (props) => {
  if (props.accessToken) {
    Spotify.setAccessToken(props.accessToken)
  }
  const {setAccessToken, loginSuccess} = props
  return (
    <div>
      <CssBaseline />
      <Switch>
        <Route path="/about" component={About} />
        <Route path="/home" render={ConnectedHome} />
        <Route exact path="/" component={ConnectedHome} />
        <Route render={() => <Redirect to="/" />} />
      </Switch>
    </div>
  )
};

const appState = ({ spotify }) => ({
  ...spotify
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
