import React from 'react';
import TextField from 'material-ui/TextField';
import { InputAdornment } from 'material-ui/Input';
import SearchIcon from 'material-ui-icons/Search';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';

export const Searchbar = ({
  classes,
  search = '',
  handleSearch = () => null,
}) => (
   <TextField
           value={search}
           placeholder="Search..."
           onChange={handleSearch}
           margin="normal"
           className={classes.searchField}
           InputProps={{
                className: classes.searchInput,
                startAdornment: (
                  <InputAdornment position="end">
                      <SearchIcon />
                    </InputAdornment>
                ) 
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
const searchDispatch = ({}) => ({});

const connectSearch = Component => connect(searchState, searchDispatch);

export const StyledSearchBar = withStyles(style)(Searchbar);

export default StyledSearchBar;
