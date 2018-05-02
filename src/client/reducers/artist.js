import _ from 'lodash';

const initialState = {
  byIds: {

  },
  allIds: [],
};

const addArtists = (state, artists) => {
  const newArtists = artists
    .map((artist) => {
      if (state.allIds.indexOf(artist.id) === -1) { return { [artist.id]: artist }; }
      return null;
    })
    .filter(e => e)
    .reduce((acc, e) => ({ ...acc, ...e }), {});
  return {
    ...state,
    byIds: _.merge(state.byIds, newArtists),
    allIds: _.uniq([...state.allIds, ...Object.keys(newArtists)]),
  };
};

const artist = (state = initialState, action) => {
  const { type, data } = action;
  switch (type) {
    case 'ADD_ARTIST': return addArtists(state, [data]);
    case 'ADD_ARTISTS': return addArtists(state, data);
    default: return state;
  }
};

export default artist;
