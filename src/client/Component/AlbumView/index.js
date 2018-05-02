import React from 'react';
import { connect } from "react-redux";
import { withStyles } from 'material-ui/styles';

const AlbumView = ({
    id
}) => {
    return (
     <div>
      { id }
     </div>
     );
}

const style = theme => ({

})

const styled = withStyles(style)(AlbumView);

const state = ({}, {match}) => {
    return ({
    id: match.params.id
 })
}

const dispatch = ({}) => ({})

export const ConnectedAlbumView = connect(state, dispatch)(styled);

export default ConnectedAlbumView