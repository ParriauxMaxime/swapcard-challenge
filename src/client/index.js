/* eslint-env browser */

import { createElement as e } from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider } from 'material-ui/styles';
import { AppContainer } from 'react-hot-loader';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import { theme } from './theme';
import App from './App';
import reducer from './reducer';


const history = createHistory();
const middleware = routerMiddleware(history);

export const store = createStore(reducer, window.__PRELOADED_STATE__, applyMiddleware(middleware));

const render = (Component) => {
  ReactDOM.hydrate(e(
    AppContainer, { warnings: false },
    e(
      Provider, { store },
      e(
        MuiThemeProvider, { theme },
        e(
          ConnectedRouter, { history },
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
