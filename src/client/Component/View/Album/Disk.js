import React from 'react';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Track, { TrackHeader } from './Track';

export const DiskHeader = ({ number }) => (
  <ListItem>
    <ListItemText>
          Disc {number}
    </ListItemText>
  </ListItem>
);

const Disk = (props) => {
  const {
    tracks,
    classes,
  } = props;
  return (
    <ListItem>
      <List disablePadding className={classes.root}>
        <TrackHeader />
        <Divider />
        {
            tracks.filter(e => e)
              .map(track => (
                <React.Fragment key={track.id}>
                  <Track {...track} />
                  <Divider />
                </React.Fragment>
              ))
          }
      </List>
    </ListItem >
  );
};

export default Disk;
