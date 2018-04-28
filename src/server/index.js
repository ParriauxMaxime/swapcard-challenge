const express = require('express');
const app = express();
const SSR = require('./middleware/SSR');
var https = require('https');
var payload = "1e0c0bed9dcf4e9b8589b8474178bf35:71b0e2abfc7e4f899ba7c55a580f5a7c";
var encodedPayload = new Buffer.from(payload).toString("base64");

let spotify = {
    access_token: null,
    expiresAt: 0,
};

function authenticate(store, req, cb) {
    if (!spotify.access_token || spotify.expiresAt < Date.now()) {
        const Authorization = "Basic " + encodedPayload;
        const post_data = "grant_type=client_credentials";
        var options = {
            path: '/api/token',
            host: 'accounts.spotify.com',
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': post_data.length,
                'Authorization': Authorization,
                
            }
        };
        var req = https.request(options, function(res) {
            let bufferString = ""
            res.on('data', (d) => {
                bufferString += Buffer.from(d).toString();
            })
            res.on('end', () => {
                const data = JSON.parse(bufferString);
                spotify.access_token = data.access_token;
                spotify.expiresAt = Date.now() + data.expires_in;
                console.log(data)
                store.dispatch({type: 'SET_SPOTIFY_ACCESS_TOKEN', data: data})
                cb()    
            })
        });
        req.write(post_data);
        req.on('error', (err) => {
            console.info(err);
        })
        req.end();
    }
    else {
        store.dispatch({type: 'SET_SPOTIFY_ACCESS_TOKEN', data: spotify})
        cb()
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