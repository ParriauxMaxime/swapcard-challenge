/* eslint-env browser */

import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import reducer from './reducer';

const store = createStore(reducer, window.__PRELOADED_STATE__);

const render = (Component) => {
  ReactDOM.render(
   <AppContainer>
    <Provider store={store}>
      <BrowserRouter>
        <Component/>
      </BrowserRouter>
    </Provider>
   </AppContainer>,
    document.getElementById('app'),
  );
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
