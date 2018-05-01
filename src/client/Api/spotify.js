import spotify from 'spotify-web-api-js';

const Spotify = new spotify();

const Action = (type, data = undefined) => {
  if (type === undefined || type === '') { throw 'Action created with no type'; }
  return {
    type,
    data,
  };
};

export const actions = {
  artistSearch: data => (
    new Action('ARTIST_SEARCH', data)
  ),
  setAccessToken: value => (
    new Action('SET_SPOTIFY_ACCESS_TOKEN', value)
  ),
  albumSearch: data => (
    new Action('ALBUM_SEARCH', data)
  ),
};

export const spotifyActions = dispatch => ({
  searchRequest: (search) => {
    if (search !== '') {
      Spotify.searchArtists(search, { limit: 8 })
        .then((res) => {
          dispatch(actions.artistSearch(res));
        })
        .catch((err) => {
          console.warn(err);
        });
    } else {
      dispatch(actions.artistSearch({ artists: { items: [] } }));
    }
  },
  albumSearchRequest: (artistId) => {
    if (artistId && artistId !== '') {
      return Spotify.getArtistAlbums(artistId, {});
    }
    return Promise.resolve([]);
  },
  setAccessToken: token => dispatch(actions.setAccessToken(token)),
});

export default Spotify;
