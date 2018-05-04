import React from 'react';
import { Link } from 'react-router-dom';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';

const urlPicture = 'https://avatars1.githubusercontent.com/u/21246251?s=400&u=70a8b7debc32833028f4ea8e9330c59a25d15deb&v=4';
const Epitech = 'http://www.epitech.eu/strasbourg/ecole-informatique-strasbourg.aspx';
const RUC = 'https://ruc.dk/en';
const Technologies = [[
  'React',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1000px-React-icon.svg.png',
  'https://reactjs.org/',
], [
  'Redux',
  'https://blobscdn.gitbook.com/v0/b/gitbook-28427.appspot.com/o/spaces%2F-L5K1I1WsuQMZ8ecEuWg%2Favatar.png?generation=1518623866348435&alt=media',
  'https://redux.js.org/',
], [
  'Webpack',
  'https://webpack.js.org/assets/icon-square-small-slack.png',
  'https://webpack.js.org/',
],
[
  'Express',
  'http://www.rosselli.com.br/img/posts/credentials-expressjs.jpg',
  'https://expressjs.com/',
],
[
  'Flow',
  'http://mherman.org/assets/img/blog/flow-logo.jpeg',
  'https://flow.org/',
],
[
  'Jest',
  'https://facebook.github.io/jest/img/opengraph.png',
  'https://facebook.github.io/jest/',
],
];

export const About = ({ classes }) => (
  <div className={classes.root}>
    <Paper className={classes.paper}>
      <Typography noWrap paragraph variant="display1">Me</Typography>
      <Typography variant="body1">
        Hey ! <br />
        My name is Maxime Parriaux, I'm an <a href={Epitech}>Epitech Strasbourg </a> student
        and I'm currently attending my 4<sup>th</sup> year of study at <a href={RUC}>Roskilde University</a> in Denmark
        thanks to the Erasmus program. <br />
        I'm { new Date().getFullYear() - new Date(1995, 5, 1).getFullYear() } years old,
        and I will graduate in August 2019.
      </Typography>
    </Paper>
    <Paper className={classes.paper}>
      <Typography paragraph noWrap variant="display1">Technologies</Typography>
      <Typography variant="body1">
        This application has been built using lots of great framework :
      </Typography>
      <div className={classes.iconsBox}>
        {
         Technologies.map(e => (
           <a href={e[2]}>
             <div
               className={classes.icons}
               style={{ backgroundImage: `url(${e[1]})` }}
             />
           </a>
         ))
       }
      </div>
    </Paper>
    <Paper className={classes.paper}>
      <Typography noWrap paragraph variant="display1">Context</Typography>
      <Typography variant="body1">
        This application is part of a 1 week technical challenge for an internship interview. <br />
        This repository is a as of today representation of my web development knowledge. (May 2018)
      </Typography>
    </Paper>
  </div>
);

const style = theme => ({
  iconsBox: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  icons: {
    height: 100,
    width: 100,
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  },
  paper: {
    margin: 'auto',
    marginTop: theme.spacing.unit * 2,
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit}px`,
    maxWidth: 800,
    [theme.breakpoints.down('xs')]: {
      margin: theme.spacing.unit,
    },
  },
});

export default withStyles(style)(About);
