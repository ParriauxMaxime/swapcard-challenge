import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import search from './reducers/search';
import spotify from './reducers/spotify';
import artist from './reducers/artist';
import album from './reducers/album';
import track from './reducers/track';

export default combineReducers({
  search,
  spotify,
  artist,
  album,
  track,
  router: routerReducer,
});
