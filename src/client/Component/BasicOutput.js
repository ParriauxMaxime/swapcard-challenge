import React from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import withStyles from 'material-ui/styles/withStyles';
import Button from 'material-ui/Button';
import Spotify, { spotifyActions } from '../Api/spotify';

export const BasicOutput = ({
  classes,
  search,
  data,
  searchRequest,
}) => (
  <div>
    <Paper className={classes.paper}>
      <pre>
        {
            JSON.stringify(data, null, '\t')
        }
      </pre>
    </Paper>
    <Button
      variant="raised"
      color="secondary"
      onClick={() => searchRequest(search)}
    >
        Send
    </Button>
  </div>
);

const style = theme => ({
  paper: theme.mixins.gutters({
    minHeight: 100,
    maxHeight: 800,
    overflow: 'auto',
  }),
});

const styled = withStyles(style)(BasicOutput);

const state = ({ spotify, search }) => ({
  ...spotify,
  search: search.input,
});


export const ConnectedBasicOutput = connect(state, spotifyActions)(styled);

export default ConnectedBasicOutput;
