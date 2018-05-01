/* eslint-env browser */

import { createElement as e } from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider } from 'material-ui/styles';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import { theme } from './theme';
import App from './App';
import reducer from './reducer';

const store = createStore(reducer, window.__PRELOADED_STATE__);

const render = (Component) => {
  ReactDOM.hydrate(e(
    AppContainer, { warnings: false },
    e(
      Provider, { store },
      e(
        MuiThemeProvider, { theme },
        e(
          Router, {},
          e(Component),
        ),
      ),
    ),
  ), document.getElementById('app'));
};

render(App);

if (module.hot) {
  module.hot.accept('./App', () => {
    const NewApp = require('./App').default;
    render(NewApp);
  });
  module.hot.accept('./reducer', () => {
    const newReducer = require('./reducer').default;
    store.replaceReducer(newReducer);
  });
}
