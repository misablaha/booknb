import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Avatar from '@material-ui/core/Avatar';
import { userPropTypes } from '../propTypes';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  avatar: {
    height: 24,
    width: 24,
  }
};

const MenuAppBar = ({ classes, user }) => (
  <AppBar position="static">
    <Toolbar>
      {/*<IconButton className={classes.menuButton} color="inherit" aria-label="Menu">*/}
        {/*<MenuIcon/>*/}
      {/*</IconButton>*/}
      <Typography variant="h6" color="inherit" className={classes.grow}>
        BooknB
      </Typography>
      {user && user.displayName && (
        <IconButton>
          {user.photos && user.photos.length > 0
            ? <Avatar alt={user.displayName} src={user.photos[0].value} className={classes.avatar}/>
            : <AccountCircle/>
          }
        </IconButton>
      )}
    </Toolbar>
  </AppBar>
);

MenuAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.shape(userPropTypes),
};

export default withStyles(styles)(MenuAppBar);
