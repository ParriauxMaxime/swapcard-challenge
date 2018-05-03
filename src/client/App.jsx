import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import CssBaseline from 'material-ui/CssBaseline';
import { connect } from "react-redux";
import { Switch, Route } from 'react-router';

import {
  addTracks,
  selectAlbum,
  addArtists, 
  albumSearch, 
  addAlbums,
  selectArtist,
  artistSearch, 
  searchInputChanged
} from './Api/action';
import { About } from "./Component/About";
import { Appbar } from './Component/Appbar';
import Spotify from './Api/spotify';
import ConnectedHome from "./Component/View/Home";
import ConnectedAlbumView from './Component/View/Album';

const App = (props) => {
  if (props.accessToken) {
    Spotify.setAccessToken(props.accessToken)
  }
  return (
    <div style={{ maxHeight: "100%", display: "flex", flexDirection: 'column' }}>
      <CssBaseline />
      <Appbar />
      <Switch>
        <Route path="/about" component={About} />
        <Route path="/home" component={ConnectedHome} />
        <Route path="/album/:id" component={ConnectedAlbumView} />
        <Route path="/" component={ConnectedHome} />
        <Route render={() => <Redirect to="/" />} />
      </Switch>
    </div>
  )
};

const appState = ({ search, album, artist, track, spotify, router }) => ({
  spotify,
  album,
  artist,
  track,
  search,
  router,
})

const dispatch = (dispatch) => ({
  initRequest: (search) => {
    dispatch(searchInputChanged(search));
    if (search !== '') {
          Spotify.searchArtists(search, { limit: 8 })
            .then(res => res.artists.items)
            .then((artists) => {
              dispatch(addArtists(artists));
              dispatch(artistSearch(artists));
            })
            .catch((err) => {
              console.warn(err);
            });
        } else {
          dispatch(artistSearch([]));
        }
  },
  initAlbum: (album) => {
    dispatch(selectAlbum(album.id));
    Spotify.getAlbumTracks(album.id)
        .then(res => res.items)
        .then(tracks => dispatch(addTracks(tracks)))
      .catch((err) => {
        console.warn(err);
      });
  },
  initArtist: (artistId) => {
    dispatch(selectArtist(artistId))
    Spotify.getArtist(artistId)
      .then(res => dispatch(addArtists([res])))
      .then(() => Spotify.getArtistAlbums(artistId))
      .then(res => res.items.reduce((acc, e) => {
        const exist = acc.findIndex(album => album.name === e.name) !== -1;
        return exist ? [...acc] : [...acc, e];
      }, []))
      .then((albums) => {
        const ids = albums.map(e => e.id);
        dispatch(albumSearch(ids));
        return Spotify.getAlbums(ids)
      })
      .then(res => res.albums)
      .then(albums => dispatch(addAlbums(albums)))
      .catch(err => console.warn(err));
  }
})

class Main extends React.Component {
  // Remove the server-side injected CSS.
  static stayHydrated = (props, prevProps = {}) => {
    if (props.spotify.accessToken) {
      Spotify.setAccessToken(props.spotify.accessToken)
    }
    if (props.router.location.search.length) {
      const {id, q} = props.router.location.search
                    .slice(1)
                    .split('&')
                    .reduce((acc, e) => {
                      const [k, v] = e.split('=')
                      return {...acc, [k]: v}
                    },{});
      if (q) {
        props.initRequest(q);
      }
      if (id) {
        props.initArtist(id)
      }
      const [pathname, albumId] = props.router.location.pathname.split('/').slice(1)
      if (pathname === "album" && id) {
        props.initAlbum(props.album.byIds[albumId])
      }
    }
  }
  
  componentDidMount() {
    const jssStyles = document.getElementById('jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
    Main.stayHydrated(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.router.location.pathname !== this.props.router.location.pathname ||
      nextProps.router.location.search !== this.props.router.location.search)
      Main.stayHydrated(nextProps); 
  }

  render() {
    return <App {...this.props} />
  }
}


export default connect(appState, dispatch)(Main);
