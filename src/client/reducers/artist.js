//@ flow
const _ = require('lodash');
import type { NormalizedStore, action, image, external_urls as urls } from '../types';

export type ArtistType = {
  name: string,
  id: string,
  genres: string,
  external_urls: urls,
  images: Array<image>
};

export type ArtistList = Array<ArtistType>;

export type ArtistState = NormalizedStore<ArtistType>;

const initialState: ArtistState = {
  byIds: {

  },
  allIds: [],
};

const addArtists = (state : ArtistState, artists: ArtistList): ArtistState => {
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

const artist = (state :ArtistState = initialState, action: action): ArtistState => {
  const { type, data } = action;
  switch (type) {
    case 'ADD_ARTIST': return addArtists(state, [data]);
    case 'ADD_ARTISTS': return addArtists(state, data);
    default: return state;
  }
};

module.exports = {
  default: artist,
};
