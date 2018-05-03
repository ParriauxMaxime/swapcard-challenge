import _ from 'lodash';

const initialState = {
  byIds: {

  },
  allIds: [],
};

const addTracks = (state, tracks) => {
  const newTracks = tracks
    .map(track => ({ [track.id]: track }))
    .filter(e => e)
    .reduce((acc, e) => ({ ...acc, ...e }), {});
  return {
    ...state,
    byIds: _.merge(state.byIds, newTracks),
    allIds: _.uniq([...state.allIds, ...Object.keys(newTracks)]),
  };
};

const track = (state = initialState, action) => {
  const { type, data } = action;
  switch (type) {
    case 'ADD_TRACK': return addTracks(state, [data]);
    case 'ADD_TRACKS': return addTracks(state, data);
    default: return state;
  }
};

export default track;
