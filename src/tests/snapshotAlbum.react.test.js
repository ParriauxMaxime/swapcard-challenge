const { createElement: e } = require('react');
const { Provider } = require('react-redux');
const { createStore } = require('redux');
const { StaticRouter } = require('react-router-dom');
const renderer = require('react-test-renderer');
const MuiThemeProvider = require('material-ui/styles').MuiThemeProvider;

const theme = require('../client/theme').theme;
const { addAlbums, selectAlbum, addTracks } = require('../client/Api/action');

import App from '../client/App';
import reducer from '../client/reducer';

const mockup = require('./mockup.json').album


it('renders correctly', () => {
  const store = createStore(reducer);
  store.dispatch(selectAlbum(mockup.id))
  store.dispatch(addAlbums([mockup]))
  store.dispatch(addTracks(mockup.tracks.items))


  //Damso - Ipséité
  const url = '/album/7ovdjtmV0Bkm4Xb4pqtrZt'
  const context = {}
  const elem = e(Provider, { store },
                  e(MuiThemeProvider, {theme}, 
                      e(StaticRouter, { 
                          location: url,
                          context
                        },
                        e(App)
                )
              )
            );
  const tree = renderer
    .create(elem)
    .toJSON();
  expect(tree).toMatchSnapshot();
});