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
  onClick = () => null,
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
        style={{ zIndex: 101 }}
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
      <div className={classes.blackFade} />
    </GridListTile>
  );
};

const style = (theme) => {
  const size = { height: 300, width: 300 };
  return {
    blackFade: {
      ...size,
      '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.42)',
      },
      top: 0,
      transition: '0.2s',
      backgroundColor: 'transparent',
      zIndex: 100,
      position: 'absolute',
    },
    root: {
      ...size,
      margin: `${theme.spacing.unit}px`,
    },
    imgContainer: {
      ...size,
      backgroundColor: theme.palette.primary.light,
    },
    infoIcon: {
      backgroundColor: 'white',
      borderRadius: '100%',
    },
  };
};

export default withStyles(style)(Album);
