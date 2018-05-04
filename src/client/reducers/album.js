// @flow

import _ from 'lodash';
import type { NormalizedStore, action, image, external_urls as urls } from '../types';
import type { ArtistType } from './artist';


export type AlbumType = {
    name: string,
    id: string,
    album_type: string,
    external_urls: urls,
    artists: Array<ArtistType>,
    images: Array<image>
};

export type AlbumState = NormalizedStore<AlbumType>

const initialState : AlbumState = {
  byIds: {

  },
  allIds: [],
};


const addAlbums = (state : AlbumState, albums) => {
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

const album = (state :AlbumState = initialState, action: action) => {
  const { type, data } = action;
  switch (type) {
    case 'ADD_ALBUM': return addAlbums(state, [data]);
    case 'ADD_ALBUMS': return addAlbums(state, data);
    default: return state;
  }
};

export default album;
