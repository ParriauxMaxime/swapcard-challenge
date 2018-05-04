const { createMuiTheme } = require('material-ui/styles');
const grey = require('material-ui/colors/grey').default;
const green = require('material-ui/colors/green').default;

const theme = createMuiTheme({
  palette: {
    primary: {
      main: grey[800],
    },
    secondary: {
      main: green[600],
    },
  },
  mixins: {
    margin: (options, unit = 1) => ({
      margin: theme.spacing.unit * unit,
      ...options,
    }),
    full: options => ({
      height: '100%',
      width: '100%',
      ...options,
    }),
  },
});

module.exports = { theme };
