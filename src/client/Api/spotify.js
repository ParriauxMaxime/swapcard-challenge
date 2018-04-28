import spotify from 'spotify-web-api-js'; 

const Spotify = new spotify();
export default Spotify;

const Action = (type, data = undefined) => {
    if (type === undefined || type === "")
        console.log('mdr');
       // throw "Action created with no type";
    return {
        type,
        data  
    }
}

export const actions = {
    artistSearch: (data) => (
        new Action('ARTIST_SEARCH', data)
    ),
    setAccessToken: (value) => (
        new Action("SET_SPOTIFY_ACCESS_TOKEN", value)      
    ),
}

export const spotifyActions = (dispatch) => ({
    searchRequest: (search) => {
        Spotify.searchArtists("damso", {limit: 5})
               .then((res) => {
                   console.log(res);
                   dispatch(actions.artistSearch(res))
               })
               .catch((err) => {
                   console.warn(err);
               })
        },
    setAccessToken: (token) => {
        console.log("YOUHOU")
        Spotify.setAccessToken(token.access_token);
        return dispatch(actions.setAccessToken(token));
    },
})

