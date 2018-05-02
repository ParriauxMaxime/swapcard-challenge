import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'
import search from './reducers/search';
import spotify from './reducers/spotify'
import artist from './reducers/artist'

export default combineReducers({
  search,
  spotify,
  artist,
  router: routerReducer
});
