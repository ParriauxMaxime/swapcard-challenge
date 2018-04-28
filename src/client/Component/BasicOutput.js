import React from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import withStyles from 'material-ui/styles/withStyles';
import Button from 'material-ui/Button';
import Spotify, { spotifyActions } from '../Api/spotify'

export const BasicOutput = ({
    classes, 
    search, 
    data, 
    searchRequest
}) => {
    return (
        <React.Fragment>
        <Paper className={classes.paper}>
        {
            JSON.stringify(data)
        }
        </Paper>
        <Button variant="raised"
        color="secondary"
        onClick={() => searchRequest(search)}>
        Send
        </Button>
        </React.Fragment>
    )
}

const boState = ({spotify, search}) => ({
    ...spotify,
    search: search.input,
})



const BasicOutputStyle = theme => ({
    paper: theme.mixins.gutters({
        minHeight: 100
    }),
})

export const ConnectedBasicOutput = connect(boState, spotifyActions)
(withStyles(BasicOutputStyle)(BasicOutput))

export default ConnectedBasicOutput;