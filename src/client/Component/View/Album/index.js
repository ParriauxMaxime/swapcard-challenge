import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import { Link, NavLink } from 'react-router-dom';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import PlayIcon from 'material-ui-icons/PlayArrow';
import List, { ListItem, ListItemText } from 'material-ui/List';
import GoBackIcon from 'material-ui-icons/ArrowBack';

import {
  albumSearch,
  addAlbums,
  selectArtist,
  searchInputChanged,
} from '../../../Api/action';
import Spotify from '../../../Api/spotify';
import ArtistList from './ArtistsList';
import TracksList from './TracksList';

const AlbumView = ({
  album_type,
  artists,
  external_urls,
  genres,
  images,
  label,
  release_date,
  tracks,
  name,
  id,
  classes,
  history,
  artistSelect,
  selectedArtist,
}) => {
  const total = tracks.length;
  return (
    <Grid container spacing={0} className={classes.root}>
      <Grid item xs={12} md={6} className={classes.left}>
        <Paper className={classes.paperInfo}>
          <Button
            className={classes.goBack}
            onClick={() => artistSelect(selectedArtist)}
          >
            <GoBackIcon />
          </Button>
          <img src={images.length !== 0 ? images[0].url : ''} className={classes.albumImg} />
            &nbsp;
          <Typography variant="display1">
            { name }
          </Typography>
            &nbsp;
          <ArtistList artists={artists} onClick={artistSelect} />
          <Typography variant="caption">
            { `${release_date.slice(0, 4)} -`}
            { `${total} track${total > 1 ? 's' : ''}` }
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6} className={classes.right}>
        <TracksList />
      </Grid>
    </Grid>
  );
};

const style = theme => ({
  root: {
    margin: 0,
    height: '100%',
  },
  left: {
    [theme.breakpoints.up('sm')]: {
      maxWidth: '40%',
      flexBasis: 0,
    },
  },
  goBack: {
    position: 'relative',
  },
  right: {
    [theme.breakpoints.up('sm')]: {
      maxWidth: '60%',
    },
    minWidth: '50%',
    margin: '0 auto',
    flexBasis: '100%',
    overflowX: 'auto',
    maxHeight: '100%',
    padding: theme.spacing.unit,
  },
  paperInfo: {
    [theme.breakpoints.down('xs')]: {
      maxHeight: 400,
      paddingTop: theme.spacing.unit,
    },
    display: 'flex',
    flexDirection: 'column',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: 500,
    height: '100%',
  },
  albumImg: {
    [theme.breakpoints.down('xs')]: {
      minHeight: 200,
      maxHeight: 200,
    },
    maxHeight: 400,
    maxWidth: 400,
  },
});

const styled = withStyles(style)(AlbumView);

const state = ({
  track, search, album, artist, router,
}) => ({
  ...album.byIds[search.albumSelected],
  tracks: album.byIds[search.albumSelected] &&
                album.byIds[search.albumSelected].tracks &&
                album.byIds[search.albumSelected].tracks.items ?
    album.byIds[search.albumSelected].tracks.items.map(e => track.byIds[e.id]) :
    [],
  selectedArtist: artist.byIds[search.artistSelected],
  router,
});

const dispatch = dispatch => ({
  artistSelect: (artist) => {
    if (!artist) {
      dispatch(push('/'));
      return;
    }
    dispatch(push(`/?q=${artist.name}&id=${artist.id}`));
  },
});

export const ConnectedAlbumView = connect(state, dispatch)(styled);

export default ConnectedAlbumView;
