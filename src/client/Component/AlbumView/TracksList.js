import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import PlayIcon from 'material-ui-icons/PlayArrow';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import MoreIcon from 'material-ui-icons/MoreHoriz';

import Spotify from '../../Api/spotify';

const TracksList = ({
  tracks,
  initLoad,
  album,
  classes,
}) => (
  <List disablePadding className={classes.root}>
    <ListItem>
      <Grid container spacing={0}>
        <Grid item xs={1}>
          <Typography variant="title">
                        #
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="title">
                            Name
          </Typography>
        </Grid>
      </Grid>
    </ListItem>
    <Divider />
    {
            tracks.filter(e => e).map((track, index) => {
                const minutes = new String(Math.floor((track.duration_ms / 1000) / 60)).padStart(2, '0');
                const seconds = new String(Math.round((track.duration_ms / 1000) % 60)).padStart(2, '0');
                return (
                  <React.Fragment key={track.id}>
                    <ListItem>
                      <Grid container spacing={0}>
                        <Grid item xs={1}>
                          <Typography variant="subheading">
                            {track.track_number}
                          </Typography>
                        </Grid>
                        <Grid item xs={8}>
                          <Typography variant="subheading">
                            { track.name }
                          </Typography>
                        </Grid>
                        <Grid item xs={2}>
                          <Typography variant="subheading">
                            { minutes } : { seconds }
                          </Typography>
                        </Grid>
                        <Grid item xs={1}>
                          <a
                            className={classes.moreLink}
                            href={track.external_urls.spotify}
                          >
                            <MoreIcon />
                          </a>
                        </Grid>
                      </Grid>
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                );
            })
        }
  </List>
);

const style = theme => ({
  root: {
    // listStyle: "none"
  },
  moreLink: {
    color: 'black',
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
  });
};

const dispatch = (dispatch, ownProps) => ({
  initLoad: tracks => dispatch(addTracks(tracks)),
});

export default connect(state, dispatch)(styled);
