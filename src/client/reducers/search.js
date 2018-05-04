// @flow

import type { action } from '../types';

export type SearchState = {
  input: string,
  albumSelected: string | null,
  artistSelected: string | null
}

const initialSearchState = {
  input: '',
  albumSelected: null,
  artistSelected: null,
};

const search = (state : SearchState = initialSearchState, action: action) => {
  const { type, data } = action;
  switch (type) {
    case 'SEARCH_INPUT_CHANGED': {
      return { ...state, input: data };
    }
    case 'ALBUM_SELECT': {
      return { ...state, albumSelected: data };
    }
    case 'ARTIST_SELECT': {
      return { ...state, artistSelected: data };
    }
    default: {
      return state;
    }
  }
};

export default search;
