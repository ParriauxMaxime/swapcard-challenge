// @flow 
import type { action } from '../types';

export type SpotifyState = {
  data: Object,
  accessToken: string | null,
  artistSearch: Array<string>,
  albumSearch: Array<string>,  
}


const initialSpotifyState = {
  data: {},
  accessToken: null,
  artistSearch: [],
  albumSearch: [],
};

const spotify = (state: SpotifyState = initialSpotifyState, action: action) => {
  const { type, data } = action;
  switch (type) {
    case 'SET_SPOTIFY_ACCESS_TOKEN': {
      return {
        ...state,
        accessToken: data.access_token,
      };
    }
    case 'ARTIST_SEARCH': {
      return {
        ...state,
        data,
        artistSearch: data.map(e => e.id),
      };
    }
    case 'ALBUM_SEARCH': {
      return {
        ...state,
        data,
        albumSearch: data,
      };
    }
    default: {
      return state;
    }
  }
};

export default spotify;
