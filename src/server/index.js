
const express = require('express');
const app = express();
const SSR = require('./middleware/SSR');
const https = require('https');
const SpotifyApi = require('spotify-web-api-node');
require('dotenv').config()
const { addArtists, artistSearch } = require('../client/Api/action');

const spotify = new SpotifyApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
});

let expireAt = 0;

function authenticate(store, req, cb) {
    function onArtistSearch() {
        if (req.path === '/' && req.query.q) {
            const search = req.query.q;
            store.dispatch({
                type: 'SEARCH_INPUT_CHANGED',
                data: search
            })
            spotify.searchArtists(search, {limit: 8})
                .then((res) => res.body.artists.items)
                .then(artists => {
                    store.dispatch(addArtists(artists));
                    store.dispatch(artistSearch(artists));
                })
                .then(() => cb())
                .catch(err => cb(err));
        }
        else {
            cb();
        }
    };
    if (expireAt < Date.now()) {
        spotify.clientCredentialsGrant()
            .then((data) => {
                spotify.setAccessToken(data.body['access_token'])
                expireAt = data.body['expires_in'] + Date.now();
                store.dispatch({
                    type: "SET_SPOTIFY_ACCESS_TOKEN",
                    data: data.body
                })
            })
            .then(onArtistSearch)
            .catch(err => console.error(err))
    }
    else {
        onArtistSearch();
    }
}


app.use(SSR({
    beforeSSR: authenticate
}), (err, req, res, next) => {
    if(err) {
        console.log("error");
        console.info(err);
    }
});


app.listen(process.env.PORT || 3000);