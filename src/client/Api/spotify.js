import spotify from 'spotify-web-api-js';
import { artistSearch, setAccessToken } from './action';

const Spotify = new spotify();


export const spotifyActions = dispatch => ({
  albumSearchRequest: (artistId) => {
    if (artistId && artistId !== '') {
      return Spotify.getArtistAlbums(artistId, {});
    }
    return Promise.resolve([]);
  },
  setAccessToken: token => dispatch(setAccessToken(token)),
});

export default Spotify;
