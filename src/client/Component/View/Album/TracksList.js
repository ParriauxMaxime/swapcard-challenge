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
  const sortedByTrackNumber = () => {
    const tab = album.byIds[search.albumSelected] &&
        album.byIds[search.albumSelected].tracks &&
        album.byIds[search.albumSelected].tracks.items ?
      album.byIds[search.albumSelected].tracks.items.map(t => track.byIds[t.id]) :
      [];
    return tab;
  };
  return ({
    tracks: sortedByTrackNumber(),
    album: album.byIds[search.albumSelected],
    disks: {
      number: _.uniq(album.byIds[search.albumSelected].tracks.items
                  .map(t => t.disc_number)).length,
      tracks: album.byIds[search.albumSelected].tracks.items.reduce(
        (acc, e) => {
          const index = e.disc_number;
          return acc.length < (index) ? 
            [...acc, [e]] : 
            [
              ...acc.slice(0, index - 1),
              [...acc[index - 1], e], 
              ...acc.slice(index, acc.length), 
            ]
        }, [])
    }
  });
};

const dispatch = (dispatch, ownProps) => ({
  initLoad: tracks => dispatch(addTracks(tracks)),
});

export default connect(state, dispatch)(styled);
