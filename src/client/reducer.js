import { combineReducers, applyMiddleware } from "redux";
//import ReduxThunk from 'redux-thunk'; 

const initialSearchState = {
  input: ""
}

const search = (state = initialSearchState, action) => {
  switch(action.type) {
    case 'SEARCH_INPUT_CHANGED': {
      return {...state, input: action.value }
    }
    default: {
      return state;
    }
  }
}

const initialSpotifyState = {
  data: {},
  accessToken: null,
}

const spotify = (state = initialSpotifyState, action) => {
  switch(action.type) {
    case "SET_SPOTIFY_ACCESS_TOKEN": {
      console.log(action.data)
      return {
        ...state, 
        accessToken: action.data.access_token,
      }
    }
    case "ARTIST_SEARCH": {
      return {...state, data: action.data}
    }
    default: {
      return state;
    }
  }
}

export default combineReducers({
  search,
  spotify,
});
