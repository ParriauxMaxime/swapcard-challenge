
const express = require('express');
const app = express();
const SSR = require('./middleware/SSR');
const https = require('https');
const SpotifyApi = require('spotify-web-api-node');
require('dotenv').config()
const { 
    addArtists, 
    addAlbums,
    addTracks,
    artistSearch, 
    searchInputChanged,
    selectAlbum,
    albumSearch,
    setAccessToken,
    selectArtist
} = require('../client/Api/action');

const spotify = new SpotifyApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
});

let expireAt = 0;

function authenticate(store, req, cb) {
    function onArtistSearch() {
        let promises = [];
        if (req.query.q) {
            const search = req.query.q;
            store.dispatch(searchInputChanged(search))
            promises.push(spotify.searchArtists(search, {limit: 8})
                .then((res) => res.body.artists.items)
                .then(artists => {
                    store.dispatch(addArtists(artists));
                    store.dispatch(artistSearch(artists));
                }));
        }
        if (req.query.id) {
            const id = req.query.id
            store.dispatch(selectArtist(id))
            promises.push(
                spotify.getArtistAlbums(id)
                    .then(res => res.body.items.reduce((acc, e) => {
                        const exist = acc.findIndex(album => album.name === e.name) !== -1;
                        return exist ? [...acc] : [...acc, e];
                    }, []))
                    .then((albums) => {
                        const ids = albums.map(e => e.id);
                        store.dispatch(addAlbums(albums))                
                        store.dispatch(albumSearch(ids));
                    })
                )
            }
        //Too lazy to refactor this
        return Promise.all(promises)
            .then(_ => null);
    };
    function onAlbumSearch() {
        const params = req.url.split('/').slice(1);
        if (params.length >=2 && 
            params[0] === "album" &&
            params[1]) {
            const id = params[1];
            store.dispatch(selectAlbum(id))
            return spotify.getAlbum(id)
                .then(res => res.body)
                .then((album) => {
                    store.dispatch(addAlbums([album]))
                    store.dispatch(addArtists(album.artists))
                    return album.tracks.items
                })
                .then(tracks => {
                    return spotify.getTracks(tracks.map(track => track.id))
                        .then(res => res.body.tracks)    
                        .then(tracks => store.dispatch(addTracks(tracks)))
                })
        }
        return Promise.resolve()
    }

    if (expireAt < Date.now()) {
        spotify.clientCredentialsGrant()
            .then((data) => {
                spotify.setAccessToken(data.body['access_token'])
                expireAt = data.body['expires_in'] + Date.now();
                store.dispatch(setAccessToken(data.body))
            })
            .then(onAlbumSearch)
            .then(onArtistSearch)
            .then(cb)
            .catch(err => console.error(err))
    }
    else {
        const accessToken = spotify.getAccessToken();
        store.dispatch(setAccessToken(accessToken))
        onAlbumSearch()
            .then(onArtistSearch)
            .then(cb)
            .catch(err => cb(err))
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