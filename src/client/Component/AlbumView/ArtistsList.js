import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import { Link } from 'react-router-dom';

const ArtistList = ({ artists }) => (
  <div>
    {
                artists.map((artist, index) => (
                  <Link to="" key={artist.id}>
                    <Typography variant="caption">
                      { artist.name }
                      { index === artists.length - 1 ? '' : ', '}
                    </Typography>
                  </Link>
                    ))
                }
  </div>
);

const style = theme => ({

});

export default withStyles(style)(ArtistList);
