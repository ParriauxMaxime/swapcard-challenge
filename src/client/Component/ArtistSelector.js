import React from 'react';
import List, { ListItem, ListItemText, ListSubheader } from 'material-ui/List';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';
import Collapse from 'material-ui/transitions/Collapse';
import Divider from 'material-ui/Divider';
import { spotifyActions, actions } from '../Api/spotify';
import Artist from './Artist';
import { albumSearch, addAlbums } from '../Api/action';
import Spotify from '../Api/spotify';

const ArtistSelector = ({
  artists,
  artistSelected,
  classes,
}) => {
  const orderedArtists = [...artists].sort((a, b) => a.popularity < b.popularity);
  return (
    <List
      subheader={<ListSubheader>Artists</ListSubheader>}
      className={classes.artistist}
    >
      <Collapse in={artists.length !== 0}>
        {
                orderedArtists.map(artist => (
                  <React.Fragment key={artist.id}>
                    <ListItem
                      className={classes.listItem}
                      onClick={() => artistSelected(artist)}
                    >
                      <Artist {...artist} />
                    </ListItem>
                  </React.Fragment>
                    ))
        }
      </Collapse>
    </List>
  );
};

const style = theme => ({
  artistList: {
    overflowY: 'auto',
    maxHeight: 900,
  },
  listItem: {
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.42)',
      transition: '0.2s',
    },
  },
});

const styled = withStyles(style)(ArtistSelector);

const state = ({ artist, spotify }) => ({
  artists: spotify.artistSearch.map(id => artist.byIds[id]),
});

const dispatch = dispatch => ({
  artistSelected: artist => (
    Spotify.getArtistAlbums(artist.id, {})
      .then(res => res.items.reduce((acc, e) => {
        const exist = acc.findIndex(album => album.name === e.name) !== -1;
        return exist ? [...acc] : [...acc, e];
      }, []))
      .then((albums) => {
        const ids = albums.map(e => e.id);
        dispatch(albumSearch(ids));
        Spotify.getAlbums(ids)
          .then(res => res.albums)
          .then(albums => dispatch(addAlbums(albums)))
          .catch(err => console.warn(err));
      })
      .catch(err => console.warn(err))
  ),
});

const ConnectedArtistSelector = connect(state, dispatch)(styled);

export default ConnectedArtistSelector;
