const reducer = require('../client/reducers/artist').default;
const {
    addArtists
} = require('../client/Api/action');
const mockup = require('./mockup.json').artists


describe('Artist reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            byIds: {},
            allIds: [],
        })
    })

    it('should handle mockup artist data (Oasis search)', () => {
        expect(reducer(undefined, addArtists(mockup))).toEqual({
            "byIds": {
                "2DaxqgrOhkeH0fpeiQq2f4": {
                    "external_urls": {
                        "spotify": "https://open.spotify.com/artist/2DaxqgrOhkeH0fpeiQq2f4"
                    },
                    "followers": {
                        "href": null,
                        "total": 2544625
                    },
                    "genres": ["britpop", "modern rock", "permanent wave", "rock"],
                    "href": "https://api.spotify.com/v1/artists/2DaxqgrOhkeH0fpeiQq2f4",
                    "id": "2DaxqgrOhkeH0fpeiQq2f4",
                    "images": [{
                        "height": 640,
                        "url": "https://i.scdn.co/image/2a8c10fe954e2038fb74251cba601a5594cc5878",
                        "width": 640
                    }, {
                        "height": 320,
                        "url": "https://i.scdn.co/image/87d18c79bbfdb1905bb202d200e1c191afc46aa5",
                        "width": 320
                    }, {
                        "height": 160,
                        "url": "https://i.scdn.co/image/b4d024ebb4863438b92a1b029bff7f9737263a57",
                        "width": 160
                    }],
                    "name": "Oasis",
                    "popularity": 80,
                    "type": "artist",
                    "uri": "spotify:artist:2DaxqgrOhkeH0fpeiQq2f4"
                },
                "0FGyUMgumQqwP8DIKXY4vK": {
                    "external_urls": {
                        "spotify": "https://open.spotify.com/artist/0FGyUMgumQqwP8DIKXY4vK"
                    },
                    "followers": {
                        "href": null,
                        "total": 2750
                    },
                    "genres": [],
                    "href": "https://api.spotify.com/v1/artists/0FGyUMgumQqwP8DIKXY4vK",
                    "id": "0FGyUMgumQqwP8DIKXY4vK",
                    "images": [{
                        "height": 640,
                        "url": "https://i.scdn.co/image/91330ce6df5635ffcf65f2d1e312f7585af6e2e4",
                        "width": 640
                    }, {
                        "height": 300,
                        "url": "https://i.scdn.co/image/717b5440157eeef9c7e910621e1754bc10b0a565",
                        "width": 300
                    }, {
                        "height": 64,
                        "url": "https://i.scdn.co/image/9dbc4d36937d01388ad522f3c3b7c1414089608e",
                        "width": 64
                    }],
                    "name": "Oasis 4you",
                    "popularity": 29,
                    "type": "artist",
                    "uri": "spotify:artist:0FGyUMgumQqwP8DIKXY4vK"
                },
                "5r03x6bfk8Eskhjln1PmKv": {
                    "external_urls": {
                        "spotify": "https://open.spotify.com/artist/5r03x6bfk8Eskhjln1PmKv"
                    },
                    "followers": {
                        "href": null,
                        "total": 3461
                    },
                    "genres": [],
                    "href": "https://api.spotify.com/v1/artists/5r03x6bfk8Eskhjln1PmKv",
                    "id": "5r03x6bfk8Eskhjln1PmKv",
                    "images": [{
                        "height": 640,
                        "url": "https://i.scdn.co/image/286a81d120301ed74d86e0b0f09a5b1f348338cd",
                        "width": 640
                    }, {
                        "height": 320,
                        "url": "https://i.scdn.co/image/73b7e3fd5fd99a2a4689eca162af2a34856503e6",
                        "width": 320
                    }, {
                        "height": 160,
                        "url": "https://i.scdn.co/image/d30eaefbfd461f86148ae110565bc8c16b79ff0f",
                        "width": 160
                    }],
                    "name": "French Piano Jazz Music Oasis",
                    "popularity": 36,
                    "type": "artist",
                    "uri": "spotify:artist:5r03x6bfk8Eskhjln1PmKv"
                },
                "64OtVKK5ivOgqJZLAy749o": {
                    "external_urls": {
                        "spotify": "https://open.spotify.com/artist/64OtVKK5ivOgqJZLAy749o"
                    },
                    "followers": {
                        "href": null,
                        "total": 1071
                    },
                    "genres": [],
                    "href": "https://api.spotify.com/v1/artists/64OtVKK5ivOgqJZLAy749o",
                    "id": "64OtVKK5ivOgqJZLAy749o",
                    "images": [{
                        "height": 640,
                        "url": "https://i.scdn.co/image/f6958e02270c0f0a1776cc93386791d14f76645d",
                        "width": 640
                    }, {
                        "height": 300,
                        "url": "https://i.scdn.co/image/71998aa3ad933391594ef600fc9c60b2220909e0",
                        "width": 300
                    }, {
                        "height": 64,
                        "url": "https://i.scdn.co/image/ec17dcdee2b24f9aa9b5587be0cb1e19926abd0b",
                        "width": 64
                    }],
                    "name": "Stress Relief Calm Oasis",
                    "popularity": 31,
                    "type": "artist",
                    "uri": "spotify:artist:64OtVKK5ivOgqJZLAy749o"
                },
                "2h6L0VqIEGqlslzLLXxKIT": {
                    "external_urls": {
                        "spotify": "https://open.spotify.com/artist/2h6L0VqIEGqlslzLLXxKIT"
                    },
                    "followers": {
                        "href": null,
                        "total": 445
                    },
                    "genres": [],
                    "href": "https://api.spotify.com/v1/artists/2h6L0VqIEGqlslzLLXxKIT",
                    "id": "2h6L0VqIEGqlslzLLXxKIT",
                    "images": [{
                        "height": 640,
                        "url": "https://i.scdn.co/image/0d78ccf6a61237ec0b84f15c44adbd0f34750950",
                        "width": 640
                    }, {
                        "height": 300,
                        "url": "https://i.scdn.co/image/7894574a290fd22eea5fdbebe0eb2436e1ad7d57",
                        "width": 300
                    }, {
                        "height": 64,
                        "url": "https://i.scdn.co/image/59c38d46cbf56ddeb19eb67112790e4046667807",
                        "width": 64
                    }],
                    "name": "Asian Flute Music Oasis",
                    "popularity": 29,
                    "type": "artist",
                    "uri": "spotify:artist:2h6L0VqIEGqlslzLLXxKIT"
                },
                "3f6qVRsU5TTzy8OjfZesBT": {
                    "external_urls": {
                        "spotify": "https://open.spotify.com/artist/3f6qVRsU5TTzy8OjfZesBT"
                    },
                    "followers": {
                        "href": null,
                        "total": 1242
                    },
                    "genres": [],
                    "href": "https://api.spotify.com/v1/artists/3f6qVRsU5TTzy8OjfZesBT",
                    "id": "3f6qVRsU5TTzy8OjfZesBT",
                    "images": [{
                        "height": 640,
                        "url": "https://i.scdn.co/image/29547161a145d1aaa79d12918f1b4efb497568c6",
                        "width": 640
                    }, {
                        "height": 300,
                        "url": "https://i.scdn.co/image/50de23667e1ca3eccabadc6932ba7aea4ee5b4fc",
                        "width": 300
                    }, {
                        "height": 64,
                        "url": "https://i.scdn.co/image/a8b5671c3eb668301541d15d4b6281395fc649e2",
                        "width": 64
                    }],
                    "name": "Oasis Worship",
                    "popularity": 28,
                    "type": "artist",
                    "uri": "spotify:artist:3f6qVRsU5TTzy8OjfZesBT"
                },
                "0fjxee1xsPYdr06YEMj3DQ": {
                    "external_urls": {
                        "spotify": "https://open.spotify.com/artist/0fjxee1xsPYdr06YEMj3DQ"
                    },
                    "followers": {
                        "href": null,
                        "total": 598
                    },
                    "genres": [],
                    "href": "https://api.spotify.com/v1/artists/0fjxee1xsPYdr06YEMj3DQ",
                    "id": "0fjxee1xsPYdr06YEMj3DQ",
                    "images": [{
                        "height": 640,
                        "url": "https://i.scdn.co/image/077f9c3b17788a3c7be26a2f79f9d541d44c7980",
                        "width": 640
                    }, {
                        "height": 300,
                        "url": "https://i.scdn.co/image/00e25fe9b87cd8d036adf0004291289ff019d895",
                        "width": 300
                    }, {
                        "height": 64,
                        "url": "https://i.scdn.co/image/e90bd378eff0330691ccb9777633e28635448f5c",
                        "width": 64
                    }],
                    "name": "Oasis Chorale",
                    "popularity": 23,
                    "type": "artist",
                    "uri": "spotify:artist:0fjxee1xsPYdr06YEMj3DQ"
                },
                "1isjL7whJKI0FmlHg73tH8": {
                    "external_urls": {
                        "spotify": "https://open.spotify.com/artist/1isjL7whJKI0FmlHg73tH8"
                    },
                    "followers": {
                        "href": null,
                        "total": 10305
                    },
                    "genres": [],
                    "href": "https://api.spotify.com/v1/artists/1isjL7whJKI0FmlHg73tH8",
                    "id": "1isjL7whJKI0FmlHg73tH8",
                    "images": [{
                        "height": 640,
                        "url": "https://i.scdn.co/image/d3a9e27e6cf8c35d95c5e8c685eb00c10c250c71",
                        "width": 640
                    }, {
                        "height": 300,
                        "url": "https://i.scdn.co/image/f1ea27d8a5023e584b66e80359b9fae231f2c1ec",
                        "width": 300
                    }, {
                        "height": 64,
                        "url": "https://i.scdn.co/image/425e119c8d561259b46e24d1d2d33cbb68f9dd03",
                        "width": 64
                    }],
                    "name": "Mantra Yoga Music Oasis",
                    "popularity": 37,
                    "type": "artist",
                    "uri": "spotify:artist:1isjL7whJKI0FmlHg73tH8"
                }
            },
            "allIds": ["2DaxqgrOhkeH0fpeiQq2f4", "0FGyUMgumQqwP8DIKXY4vK", "5r03x6bfk8Eskhjln1PmKv", "64OtVKK5ivOgqJZLAy749o", "2h6L0VqIEGqlslzLLXxKIT", "3f6qVRsU5TTzy8OjfZesBT", "0fjxee1xsPYdr06YEMj3DQ", "1isjL7whJKI0FmlHg73tH8"]
        })
    })
})