import React from 'react';
import List, { ListItem, ListItemText, ListSubheader } from 'material-ui/List';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';
import Collapse from 'material-ui/transitions/Collapse';
import Divider from 'material-ui/Divider';
import { spotifyActions, actions } from '../Api/spotify';
import Artist from './Artist';
import { albumSearch, addAlbums, selectArtist } from '../Api/action';
import Spotify from '../Api/spotify';
import { push } from 'react-router-redux';
import Searchbar from './Searchbar';

const ArtistSelector = ({
  artists,
  artistSelected,
  artistSelect,
  classes,
}) => {
  const orderedArtists = [
    ...artists.filter(e => e.id !== (artistSelected ? artistSelected.id : '')),
  ].sort((a, b) => a.popularity < b.popularity);
  return (
    <div className={classes.artistList}>
      <Searchbar />
      <List
        subheader={<ListSubheader style={{ position: 'relative' }}>
                    Artists
                   </ListSubheader>}
      >
        {
        artistSelected ?
          <ListItem
            className={`${classes.listItem} ${classes.selected}`}
          >
            <Artist {...artistSelected} />
          </ListItem> :
          null
      }
        <Collapse in={artists.length !== 0}>
          {
                  orderedArtists.map(artist => (
                    <React.Fragment key={artist.id}>
                      <ListItem
                        className={classes.listItem}
                        onClick={() => artistSelect(artist)}
                      >
                        <Artist {...artist} />
                      </ListItem>
                    </React.Fragment>
                    ))
          }
        </Collapse>
      </List>
    </div>
  );
};

const style = theme => ({
  artistList: {
    overflowY: 'auto',
    maxHeight: '100%',
  },
  listItem: {
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.42)',
      transition: '0.2s',
    },
  },
  selected: {
    backgroundColor: 'rgba(0, 0, 0, 0.32)',
  },
});

const styled = withStyles(style)(ArtistSelector);

const state = ({ artist, spotify, search }) => ({
  artists: spotify.artistSearch.map(id => artist.byIds[id]),
  artistSelected: artist.byIds[search.artistSelected],
});

const dispatch = dispatch => ({
  artistSelect: (artist) => {
    dispatch(push(`/?q=${artist.name}&id=${artist.id}`));
  },
});

const ConnectedArtistSelector = connect(state, dispatch)(styled);

export default ConnectedArtistSelector;
