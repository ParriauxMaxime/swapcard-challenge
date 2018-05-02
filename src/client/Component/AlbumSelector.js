import React from 'react';
import List, { ListItem, ListItemText, ListSubheader } from 'material-ui/List';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';
import Collapse from 'material-ui/transitions/Collapse';
import Divider from 'material-ui/Divider';
import GridList, { GridListTile, GridListTileBar } from 'material-ui/GridList';
import Subheader from 'material-ui/List/ListSubheader';
import { spotifyActions, actions } from '../Api/spotify';
import Artist from './Artist';
import Album from './Album';
import { push } from 'react-router-redux';

const AlbumSelector = ({
  albumSearch = [],
  albumRedirect,
  classes,
}) => {
  const typeName = {
    album: 'Albums',
    single: 'Singles',
    appears_on: 'Appear on',
  };
  const filterByType = type => ({
    type: typeName[type],
    albums: albumSearch.filter(e => e.album_group === type),
  });
  const albums = filterByType('album');
  const singles = filterByType('single');
  const appearsOn = filterByType('appears_on');
  const lists = [albums, singles, appearsOn];
  return (
    <React.Fragment>
      <List className={classes.list}>
        <ListItem>
          <ListItemText primary="albums" />
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
                                      <Album {...album} 
                                        onClick={() => albumRedirect(album.id)}/>
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
  },
  gridList: {
  },
});

const styled = withStyles(style)(AlbumSelector);

const state = ({ spotify, router }) => ({
  albumSearch: spotify.albumSearch,
});

const dispatch = (dispatch, ownProps) => ({
  albumRedirect: (id) => {
    dispatch(push('/album/' + id))
  },
});

const ConnectedArtistSelector = connect(state, dispatch)(styled);

export default ConnectedArtistSelector;
