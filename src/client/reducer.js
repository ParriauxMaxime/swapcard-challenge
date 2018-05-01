import { combineReducers, applyMiddleware } from 'redux';

const initialSearchState = {
  input: '',
};

const search = (state = initialSearchState, action) => {
  switch (action.type) {
    case 'SEARCH_INPUT_CHANGED': {
      return { ...state, input: action.data };
    }
    default: {
      return state;
    }
  }
};

const initialSpotifyState = {
  data: {},
  accessToken: null,
  artistSearch: [],
  albumSearch: [],
};

const spotify = (state = initialSpotifyState, action) => {
  switch (action.type) {
    case 'SET_SPOTIFY_ACCESS_TOKEN': {
      return {
        ...state,
        accessToken: action.data.access_token,
      };
    }
    case 'ARTIST_SEARCH': {
      return {
        ...state,
        data: action.data,
        artistSearch: action.data.artists.items,
      };
    }
    case 'ALBUM_SEARCH': {
      return {
        ...state,
        data: action.data,
        albumSearch: action.data.items.reduce((acc, e) => {
          const exist = acc.findIndex(album => album.name === e.name) !== -1;
          return exist ? [...acc] : [...acc, e];
        }, []),
      };
    }
    default: {
      return state;
    }
  }
};

export default combineReducers({
  search,
  spotify,
});
