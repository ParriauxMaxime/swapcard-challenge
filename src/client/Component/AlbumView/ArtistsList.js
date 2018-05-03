import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

const ArtistList = ({ artists, onClick }) => (
  <div>
    {
                artists.map((artist, index) => (
                  <Button onClick={() => onClick(artist)} 
                        key={artist.id}>
                    <Typography variant="caption">
                      { artist.name }
                      { index === artists.length - 1 ? '' : ', '}
                    </Typography>
                  </Button>
                    ))
                }
  </div>
);

const style = theme => ({

});

export default withStyles(style)(ArtistList);
