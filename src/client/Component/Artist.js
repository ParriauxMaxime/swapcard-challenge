import React from 'react';
import { ListItemText } from 'material-ui/List';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';

export const Artist = ({
  classes,
  id,
  name,
  popularity,
  images,
  genres,
}) => {
  const genreString = genres.join(', ');
  const genre = genreString.length > 50 ?
    `${genreString.slice(0, 47)}...` :
    genreString;
  const selectResolution = (aboveHeight) => {
    images.filter(e => e.height > aboveHeight);
    return [...images].reverse()[0];
  };
  const image = selectResolution(100);
  return (
    <div className={classes.root}>
      <div className={classes.imgContainer}>
        {
                    image ?
                      <img
                        src={image.url}
                        alt={`${name} picture`}
                        height="100"
                        width="100"
                      /> :
                    null
                }
      </div>
      <ListItemText primary={name} secondary={genre} />
    </div>
  );
};

const ArtistStyle = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },
  imgContainer: {
    height: 100,
    width: 100,
    margin: 'auto',
    backgroundColor: theme.palette.primary.light,
  },
});

export default withStyles(ArtistStyle)(Artist);
