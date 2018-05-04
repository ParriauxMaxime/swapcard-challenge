const {
    addArtists,
} = require('../client/Api/action');

const mockup = require('./mockup.json').artists


test('add artists to store', () => {
    const artists = mockup.artists;
    const expectedAction = {
        type: 'ADD_ARTISTS',
        data: artists
    }
    expect(addArtists(artists)).toEqual(expectedAction);
})