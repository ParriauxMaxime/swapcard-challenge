import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { NavLink } from 'react-router-dom';

import List, { ListItem, ListItemText, ListSubheader } from 'material-ui/List';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';
import Collapse from 'material-ui/transitions/Collapse';
import Divider from 'material-ui/Divider';
import GridList, { GridListTile, GridListTileBar } from 'material-ui/GridList';
import Subheader from 'material-ui/List/ListSubheader';

import Artist from './Artist';
import Album from './Album';
import { selectAlbum, addTracks } from '../../../Api/action';
import Spotify from '../../../Api/spotify';


const AlbumSelector = ({
  albums = [],
  albumRedirect,
  classes,
}) => {
  const typeName = {
    album: 'Albums',
    single: 'Singles',
    compilation: 'Compilations',
  };
  const filterByType = type => ({
    type: typeName[type],
    albums: albums.filter(e => e && e.album_type === type),
  });
  const album = filterByType('album');
  const singles = filterByType('single');
  const compilation = filterByType('compilation');
  const lists = [album, singles, compilation];
  return (
    <React.Fragment>
      <List className={classes.list}>
        <ListItem>
          <ListItemText primary="Albums" />
        </ListItem>
        {
            lists.map(list => (
                list.albums.length > 0 ?
                  <React.Fragment key={list.type}>
                    <Divider />
                    <ListItem>
                      <ListItemText primary={list.type} />
                    </ListItem>
                    <ListItem>
                      <GridList
                        cellHeight={180}
                        className={classes.gridList}
                      >
                        {
                                list.albums.map(album => (
                                  <React.Fragment key={album.id}>
                                    <NavLink to={`/album/${album.id}`}>
                                      <Album
                                        {...album}
                                        onClick={() => albumRedirect(album)}
                                      />
                                    </NavLink>
                                  </React.Fragment>
                                    ))
                            }
                      </GridList>
                    </ListItem>
                  </React.Fragment> :
                    null
                ))
        }
      </List>
    </React.Fragment>
  );
};

const style = theme => ({
  list: {
    width: '100%',
    maxHeight: '100%',
    overflowY: 'auto',
  },
});

const styled = withStyles(style)(AlbumSelector);

const state = ({ album, spotify, router }) => ({
  albums: spotify.albumSearch.map(id => album.byIds[id]),
});

const dispatch = (dispatch, ownProps) => ({
  albumRedirect: (album) => {
    dispatch(selectAlbum(album.id));
    Spotify.getAlbumTracks(album.id)
      .then(res => res.items)
      .then(tracks => dispatch(addTracks(tracks)))
      .catch(err => console.warn(err));
    dispatch(push(`/album/${album.id}`));
  },
});

const ConnectedArtistSelector = connect(state, dispatch)(styled);

export default ConnectedArtistSelector;