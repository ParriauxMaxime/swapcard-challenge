//@ flow

import React from 'react';
import List, { ListItem, ListSubheader } from 'material-ui/List';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';
import Collapse from 'material-ui/transitions/Collapse';
import { push } from 'react-router-redux';

import Artist from './Artist';
import Searchbar from './Searchbar';

import type { ArtistType, ArtistList } from '../../../reducers/artist';
import type { store, styles } from '../../../types';

opaque type ArtistSelectorProps = {
  artists: ArtistList,
  artistSelected: ArtistType,
  artistSelect: (artist: ArtistType) => any
} & styles;

const ArtistSelector = ({
  artists,
  artistSelected,
  artistSelect,
  classes,
}: ArtistSelectorProps) => {
  const orderedArtists = [
    ...artists.filter(e => e.id !== (artistSelected ? artistSelected.id : '')),
  ].sort((a, b) => a.popularity < b.popularity);
  return (
    <div className={classes.artistList}>
      <Searchbar />
      <List
        subheader={
          <ListSubheader style={{ position: 'relative' }}>
            Artists
          </ListSubheader>
        }
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

const state = ({ artist, spotify, search }: store) => ({
  artists: spotify.artistSearch.map(id => artist.byIds[id]),
  artistSelected: artist.byIds[search.artistSelected],
});

const actions = dispatch => ({
  artistSelect: (artist) => {
    dispatch(push(`/?q=${artist.name}&id=${artist.id}`));
  },
});

const ConnectedArtistSelector = connect(state, actions)(styled);

export default ConnectedArtistSelector;
