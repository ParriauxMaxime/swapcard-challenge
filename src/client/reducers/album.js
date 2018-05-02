import _ from 'lodash';

const initialState = {
  byIds: {

  },
  allIds: [],
};

const addAlbums = (state, albums) => {
  const newAlbums = albums
    .map(album => ({ [album.id]: album }))
    .filter(e => e)
    .reduce((acc, e) => ({ ...acc, ...e }), {});
  return {
    ...state,
    byIds: _.merge(state.byIds, newAlbums),
    allIds: _.uniq([...state.allIds, ...Object.keys(newAlbums)]),
  };
};

const album = (state = initialState, action) => {
  const { type, data } = action;
  switch (type) {
    case 'ADD_ALBUM': return addAlbums(state, [data]);
    case 'ADD_ALBUMS': return addAlbums(state, data);
    default: return state;
  }
};

export default album;
