import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import PlayIcon from 'material-ui-icons/PlayArrow';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import MoreIcon from 'material-ui-icons/MoreHoriz';

import Spotify from '../../../Api/spotify';
import Disk, { DiskHeader } from './Disk';

const TracksList = ({
  tracks,
  initLoad,
  album,
  disks,
  classes,
}) => { 
  return (
    <List disablePadding className={classes.root}>
      {
        disks.tracks.map(disk => {
          return (
            <React.Fragment key={disk[0].id + disk[0].disc_number}>
              <DiskHeader number={disk[0].disc_number}/>
              <Disk tracks={disk} classes={classes}/>
            </React.Fragment>
          );
        })
      }
    </List>
  );
}

const style = theme => ({
  root: {
    flex: 1
  },
});

const styled = withStyles(style)(TracksList);

const state = ({ track, album, search }) => {
  const selectedAlbum = album.byIds[search.albumSelected]
  const getTracks = () => (
    selectedAlbum &&
    selectedAlbum.tracks &&
    selectedAlbum.tracks.items ?
      selectedAlbum.tracks.items.map(t => track.byIds[t.id]) :
      []
  );
  const reduceTracksInDisk = (acc, e) => (
    acc.length < (e.disc_number) ? 
      [...acc, [e]] : 
      [
        ...acc.slice(0, e.disc_number - 1),
        [...acc[e.disc_number - 1], e], 
        ...acc.slice(e.disc_number, acc.length), 
      ]
  ); 
  return ({
    tracks: getTracks(),
    album: selectedAlbum,
    disks: {
      tracks: selectedAlbum && 
              selectedAlbum.tracks &&
              selectedAlbum.tracks.items ?
                selectedAlbum.tracks.items.reduce(reduceTracksInDisk, []) :
                []
    }
  });
};

const dispatch = (dispatch, ownProps) => ({
  initLoad: tracks => dispatch(addTracks(tracks)),
});

export default connect(state, dispatch)(styled);
