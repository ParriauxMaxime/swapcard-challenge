const initialSearchState = {
  input: '',
  albumSelected: '',
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
    default: {
      return state;
    }
  }
};

export default search;
