import React from 'react';
import { ListItemText } from 'material-ui/List';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';
import GridList, { GridListTile, GridListTileBar } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import InfoIcon from 'material-ui-icons/Info';

export const Album = ({
  classes,
  id,
  name,
  images,
  artists,
  external_urls,
}) => {
  const albumExternalRedirect = () => window.open(external_urls.spotify);
  const artistString = artists.map(e => e.name).join(', ');
  const artist = artistString.length > 50 ?
    `${artistString.slice(0, 47)}...` :
    artistString;
  const image = images.length > 0 ? images[0] : { url: undefined };
  return (
    <GridListTile className={classes.root}>
      <img
        src={image.url}
        alt={`album-${name}`}
        className={classes.imgContainer}
      />
      <GridListTileBar
        title={name}
        subtitle={artist}
        actionIcon={
          <IconButton className={classes.icon} onClick={albumExternalRedirect}>
            <div className={classes.infoIcon}>
              <InfoIcon color="secondary" />
            </div>
          </IconButton>
             }
      />
    </GridListTile>
  );
};

const style = theme => ({
  root: {
    width: 300,
    height: 300,
    margin: `${theme.spacing.unit}px`,
  },
  imgContainer: {
    height: 300,
    width: 300,
    backgroundColor: theme.palette.primary.light,
  },
  infoIcon: {
    backgroundColor: 'white',
    borderRadius: '100%',
  },
});

export default withStyles(style)(Album);
