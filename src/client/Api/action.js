function Action(type, data = undefined) {
    if (type === undefined || type === '') { throw 'Action created with no type'; }
    return {
      type,
      data,
    };
  };
  
  const setAccessToken = value => Action('SET_SPOTIFY_ACCESS_TOKEN', value);
  const artistSearch = data => Action('ARTIST_SEARCH', data);
  const albumSearch = data => Action('ALBUM_SEARCH', data);
  const searchInputChanged = search => Action('SEARCH_INPUT_CHANGED', search);
  const addArtists = data => Action('ADD_ARTISTS', data);
  
  module.exports = {
    setAccessToken,
    artistSearch,
    albumSearch,
    searchInputChanged,
    addArtists,
  }