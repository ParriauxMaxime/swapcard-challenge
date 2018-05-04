import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import GoBackIcon from 'material-ui-icons/ArrowBack';

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
  artistSelect,
  selectedArtist,
}) => {
  const total = tracks.length;
  return (
    <Grid container spacing={0} className={classes.root}>
      <Grid item xs={12} sm={4} md={3} className={classes.left}>
        <Paper className={classes.paperInfo}>
          <Button
            className={classes.goBack}
            onClick={() => artistSelect(selectedArtist)}
          >
            <GoBackIcon />
          </Button>
          <img
            src={images && images.length !== 0 ? images[0].url : ''}
            alt={`${name} album`}
            className={classes.albumImg}
          />
            &nbsp;
          <Typography variant="display1" className={classes.albumTitle}>
            { name }
          </Typography>
            &nbsp;
          <ArtistList artists={artists} onClick={artistSelect} />
          <Typography variant="caption">
            { release_date ? `${release_date.slice(0, 4)} - ` : null }
            { total ? `${total} track${total > 1 ? 's' : ''}` : null }
          </Typography>
          <Typography variant="caption">
            { label }
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={8} md={9} className={classes.right}>
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
  albumTitle: {
    textAlign: 'center',
  },
  left: {
    [theme.breakpoints.down('sm')]: {
      minWidth: 300,
    },
    [theme.breakpoints.up('sm')]: {
      maxWidth: '40%',
      flexBasis: 0,
    },
  },
  goBack: {
    position: 'relative',
    marginRight: 'auto',
  },
  right: {
    margin: '0 auto',
    maxWidth: '100%',
    flex: 1,
    overflowX: 'auto',
    maxHeight: '100%',
    padding: theme.spacing.unit,
  },
  paperInfo: {
    [theme.breakpoints.down('xs')]: {
      padding: `${theme.spacing.unit}px 0`,
      height: 'auto',
    },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: 600,
    height: '100%',
  },
  albumImg: {
    [theme.breakpoints.down('sm')]: {
      maxWidth: 300,
      maxHeight: 300,
    },
    [theme.breakpoints.down('xs')]: {
      maxWidth: 200,
      maxHeight: 200,
    },
    padding: theme.spacing.unit,
    maxHeight: 400,
    maxWidth: 400,
  },
});

const styled = withStyles(style)(AlbumView);

const state = ({
  track, search, album, artist, router,
}) => {
  const selectedAlbum = album.byIds[search.albumSelected];
  return {
    ...selectedAlbum,
    tracks: selectedAlbum &&
            selectedAlbum.tracks &&
            selectedAlbum.tracks.items ?
      selectedAlbum.tracks.items.map(e => track.byIds[e.id]) :
      [],
    selectedArtist: artist.byIds[search.artistSelected],
    router,
  };
};

const actions = dispatch => ({
  artistSelect: (artist) => {
    if (!artist) {
      dispatch(push('/'));
      return;
    }
    dispatch(push(`/?q=${artist.name}&id=${artist.id}`));
  },
});

export const ConnectedAlbumView = connect(state, actions)(styled);

export default ConnectedAlbumView;
