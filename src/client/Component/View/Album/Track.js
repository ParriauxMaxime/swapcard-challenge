import React from 'react';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import { ListItem } from 'material-ui/List';
import MoreIcon from 'material-ui-icons/MoreHoriz';

export const TrackHeader = () => (
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
);

const Track = (props) => {
  const {
    track_number,
    name,
    duration_ms,
    external_urls,
  } = props;
  const minutes = String(Math.floor((duration_ms / 1000) / 60)).padStart(2, '0');
  const seconds = String(Math.round((duration_ms / 1000) % 60)).padStart(2, '0');
  return (
    <ListItem>
      <Grid container spacing={0}>
        <Grid item xs={1}>
          <Typography variant="subheading">
            {track_number}
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="subheading">
            { name }
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="subheading">
            { minutes } : { seconds }
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <a href={external_urls.spotify} style={{ color: 'black' }}>
            <MoreIcon />
          </a>
        </Grid>
      </Grid>
    </ListItem>
  );
};

export default Track;
