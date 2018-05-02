import React from 'react';
import List, { ListItem, ListItemText, ListSubheader } from 'material-ui/List';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';
import Collapse from 'material-ui/transitions/Collapse';
import Divider from 'material-ui/Divider';
import { spotifyActions, actions } from '../Api/spotify';
import Artist from './Artist';
import { albumSearch } from '../Api/action';

const ArtistSelector = ({
  artists,
  artistSelected,
  classes,
}) => {
  console.info(artists);
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

const state = ({ artist, spotify }) => {
  console.log(artist, spotify.artistSearch)
  return ({
    artists: spotify.artistSearch.map(id => artist.byIds[id]),
  });
}

const dispatch = dispatch => ({
  artistSelected: artist => (
    spotifyActions(dispatch).albumSearchRequest(artist.id)
      .then(res => dispatch(albumSearch(res)))
      .catch(err => console.warn(err))
  ),
});

const ConnectedArtistSelector = connect(state, dispatch)(styled);

export default ConnectedArtistSelector;
