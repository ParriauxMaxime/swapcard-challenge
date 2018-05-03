const initialSearchState = {
  input: '',
  albumSelected: null,
  artistSelected: null,
};

const search = (state = initialSearchState, action) => {
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
