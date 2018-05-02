import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import { Link } from 'react-router-dom';

import ArtistList from './ArtistsList';

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
}) => {
  if (!images) return null;
  return (
    <div className={classes.root}>
      <div className={classes.left}>
        <img src={images.length !== 0 ? images[0].url : ''} height="500" width="500" />
        <Typography variant="display1">
          { name }
        </Typography>
        <ArtistList artists={artists} />
        <Typography variant="caption">
          { `${release_date.slice(0, 4)} - ${tracks.total} track${tracks.total}` > 1 ? 's' : '' }
        </Typography>
      </div>
      <div className={classes.right}>
        Here
      </div>
    </div>
  );
};

const style = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
    //       minHeight: "calc(100vh - 64px)"
  },
  left: {
    minWidth: 500,
    width: '40%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  right: {

  },
});

const styled = withStyles(style)(AlbumView);

const state = ({ search, album, artist }) => ({
  ...album.byIds[search.albumSelected],
});

const dispatch = ({}) => ({});

export const ConnectedAlbumView = connect(state, dispatch)(styled);

export default ConnectedAlbumView;
