import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { FaGoogle } from 'react-icons/fa';

const styles = theme => ({
  root: {
    backgroundColor: '#DB4A3F',
    '&:hover': {
      backgroundColor: '#F77167',
    }
  },
  label: {
    color: '#FFFFFF',
  },
  icon: {
    marginRight: theme.spacing.unit,
  },
});

const GoogleLoginButton = (props) => {
  const { classes } = props;

  return (
    <Button
      classes={{
        root: classes.root,
        label: classes.label,
      }}
      href={props.href}
      onClick={props.onClick}
    >
      <FaGoogle className={classes.icon}/>
      <span>Google</span>
    </Button>
  );
};

GoogleLoginButton.propTypes = {
  classes: PropTypes.object.isRequired,
  href: PropTypes.string,
  onClick: PropTypes.func,
};

export default withStyles(styles)(GoogleLoginButton);
