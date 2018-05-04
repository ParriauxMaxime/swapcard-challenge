import React from 'react';
import { ListItemText } from 'material-ui/List';
import { withStyles } from 'material-ui/styles';

const Artist = (props) => {
  const {
    classes,
    id,
    name,
    popularity,
    images,
    genres,
  } = props;
  const genreString = genres ? genres.join(', ') : '';
  const genre = genreString.length > 50 ?
    `${genreString.slice(0, 47)}...` :
    genreString;
  const selectResolution = aboveHeight => (images ?
    [...images.filter(e => e.height > aboveHeight)].reverse()[0] :
    { url: '' });
  const image = selectResolution(100);
  return (
    <div className={classes.root}>
      <div className={classes.imgContainer}>
        {
                    image ?
                      <img
                        src={image.url}
                        alt={`${name}`}
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
    minHeight: 100,
    height: 100,
    minWidth: 100,
    width: 100,
    margin: 'auto',
    backgroundColor: theme.palette.primary.light,
  },
});

export default withStyles(ArtistStyle)(Artist);
