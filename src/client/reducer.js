import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import search from './reducers/search';
import spotify from './reducers/spotify';
import artist from './reducers/artist';
import album from './reducers/album';

export default combineReducers({
  search,
  spotify,
  artist,
  album,
  router: routerReducer,
});
