// @flow

import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import search from './reducers/search';
import spotify from './reducers/spotify';
import album from './reducers/album';
import track from './reducers/track';

const artist = require('./reducers/artist').default;

export default combineReducers({
  search,
  spotify,
  artist,
  album,
  track,
  router: routerReducer,
});
