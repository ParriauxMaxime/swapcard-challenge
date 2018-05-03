import React from 'react';
import TextField from 'material-ui/TextField';
import { InputAdornment } from 'material-ui/Input';
import SearchIcon from 'material-ui-icons/Search';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';
import Spotify from '../Api/spotify';
import { spotifyActions } from '../Api/spotify';
import { push } from 'react-router-redux';
import { searchInputChanged, addArtists, artistSearch } from '../Api/action';


export const Searchbar = ({
  classes,
  input = '',
  artistSelected = null,
  onChange = () => null,
}) => (
  <TextField
    value={input}
    placeholder="Search..."
    onChange={(e) => onChange(e, artistSelected)}
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
  onChange: (event, selectedId = null) => {
    const search = event.target.value;
    dispatch(push(`/?q=${search}` + (selectedId ? `&id=${selectedId}` : "")));
    dispatch(searchInputChanged(search));
    if (search !== '') {
      Spotify.searchArtists(search, { limit: 8 })
        .then(res => res.artists.items)
        .then((artists) => {
          dispatch(addArtists(artists));
          dispatch(artistSearch(artists));
        })
        .catch((err) => {
          console.warn(err);
        });
    } else {
      dispatch(artistSearch([]));
    }
  },
});

const connectSearch = Component => connect(searchState, searchDispatch)(Component);

export const StyledSearchBar = withStyles(style)(Searchbar);

export default connectSearch(StyledSearchBar);
