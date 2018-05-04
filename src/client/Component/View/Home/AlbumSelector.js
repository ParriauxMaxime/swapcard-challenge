// @flow

import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { NavLink } from 'react-router-dom';

import List, { ListItem, ListItemText, ListSubheader } from 'material-ui/List';
import { withStyles } from 'material-ui/styles';
import Divider from 'material-ui/Divider';
import GridList from 'material-ui/GridList';

import Artist from './Artist';
import Album from './Album';
import { selectAlbum, addTracks } from '../../../Api/action';
import Spotify from '../../../Api/spotify';
import type { styles } from '../../../types';
import type { AlbumType, AlbumState } from '../../../reducers/album';

opaque type AlbumList = Array<AlbumType>;

type AlbumSelectorProps = {
  albums: AlbumList,
  albumRedirect: (album: AlbumType) => any,
} & styles;

const typeName = {
  album: 'Albums',
  single: 'Singles',
  compilation: 'Compilations'
};

const filterByType = (albums: AlbumList, type: string) => ({
  type: typeName[type],
  albums: albums.filter(e => e && e.album_type === type),
});

const AlbumSelector = ({
  albums = [],
  albumRedirect,
  classes,
}: AlbumSelectorProps) => {
  const albumType = filterByType(albums, 'album');
  const singles = filterByType(albums, 'single');
  const compilation = filterByType(albums, 'compilation');
  const lists = [albumType, singles, compilation];
  return (
    <Fragment>
      <List
        className={classes.list}
        subheader={
          <ListSubheader style={{ position: 'relative' }}>
                Albums
          </ListSubheader>
            }
      >
        {
            lists.map(list => (
                list.albums.length > 0 ?
                  <Fragment key={list.type}>
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
                                  <Fragment key={album.id}>
                                    <NavLink to={`/album/${album.id}`}>
                                      <Album
                                        {...album}
                                        onClick={() => albumRedirect(album)}
                                      />
                                    </NavLink>
                                  </Fragment>
                                    ))
                            }
                      </GridList>
                    </ListItem>
                  </Fragment> :
                    null
                ))
        }
      </List>
    </Fragment>
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

opaque type reducer = {album: AlbumState, spotify: any};
opaque type stateT = {albums: AlbumList};

const state = ({ album, spotify }: reducer): stateT => ({
  albums: spotify.albumSearch.map(id => album.byIds[id]),
});

const actions = dispatch => ({
  albumRedirect: (album) => {
    dispatch(selectAlbum(album.id));
    Spotify.getAlbumTracks(album.id)
      .then(res => res.items)
      .then(tracks => dispatch(addTracks(tracks)))
      .catch(err => console.warn(err));
    dispatch(push(`/album/${album.id}`));
  },
});

const ConnectedArtistSelector = connect(state, actions)(styled);

export default ConnectedArtistSelector;
