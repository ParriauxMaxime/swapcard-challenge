function ActionCreatorError(err = undefined) {
  return { error: 'Action created with no type', additionalErr: err };
}

function Action(type, data = undefined) {
  if (type === undefined || type === '') {
    throw ActionCreatorError();
  }
  return {
    type,
    data,
  };
}

const setAccessToken = value => Action('SET_SPOTIFY_ACCESS_TOKEN', value);
const artistSearch = data => Action('ARTIST_SEARCH', data);
const albumSearch = data => Action('ALBUM_SEARCH', data);
const searchInputChanged = search => Action('SEARCH_INPUT_CHANGED', search);
const addArtists = data => Action('ADD_ARTISTS', data);
const addAlbums = data => Action('ADD_ALBUMS', data);
const addTracks = data => Action('ADD_TRACKS', data);
const selectAlbum = data => Action('ALBUM_SELECT', data);
const selectArtist = data => Action('ARTIST_SELECT', data);

module.exports = {
  setAccessToken,
  artistSearch,
  selectAlbum,
  albumSearch,
  searchInputChanged,
  addArtists,
  addAlbums,
  addTracks,
  selectArtist,
};
