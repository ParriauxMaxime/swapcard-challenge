import React from 'react';
import TextField from 'material-ui/TextField';
import { InputAdornment } from 'material-ui/Input';
import SearchIcon from 'material-ui-icons/Search';

import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';
import { spotifyActions } from '../Api/spotify';


export const Searchbar = ({
  classes,
  input = '',
  searchInputChanged = () => null,
}) => (
  <TextField
    value={input}
    placeholder="Search..."
    onChange={searchInputChanged}
    margin="normal"
    className={classes.searchField}
    InputProps={{
                className: classes.searchInput,
                startAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                ),
            }}
  />
);

const style = theme => ({
  searchField: {
    marginLeft: 60,
  },
  searchInput: {
    color: 'white',
    '&:before': {
      backgroundColor: 'white',
    },
  },
});

const searchState = ({ search }) => ({ ...search });
const searchDispatch = dispatch => ({
  searchInputChanged: (event) => {
    const search = event.target.value;
    history.pushState({}, '', `?q=${search}`)
    dispatch({
      type: 'SEARCH_INPUT_CHANGED',
      data: search,
    });
    spotifyActions(dispatch).searchRequest(search);
  },
});

const connectSearch = Component => connect(searchState, searchDispatch)(Component);

export const StyledSearchBar = withStyles(style)(Searchbar);

export default connectSearch(StyledSearchBar);
