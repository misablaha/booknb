import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Slide from '@material-ui/core/Slide/Slide';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/core';

const styles = {
  appBar: {
    position: 'relative',
  },
  backButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  closeButton: {
    marginLeft: 20,
    marginRight: -12,
  },
  flex: {
    flex: 1,
  },
};

const Transition = (props) => (
  <Slide direction="left" {...props} />
);

const FullScreenDialog = (props) => {
  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="simple-dialog-title"
      TransitionComponent={Transition}
      scroll={'paper'}
      fullScreen
    >
      <AppBar className={props.classes.appBar} color="default">
        <Toolbar>
          {props.showBack && (
            <IconButton
              className={props.classes.backButton}
              color="inherit"
              onClick={props.onBackClick}
              aria-label="Back"
            >
              <ArrowBackIcon/>
            </IconButton>
          )}
          <Typography variant="title" color="inherit" className={props.classes.flex}>
            {props.title}
          </Typography>
          {props.showClose && (
            <IconButton
              className={props.classes.closeButton}
              color="inherit"
              onClick={props.onCloseClick}
              aria-label="Close"
            >
              <CloseIcon/>
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
      <DialogContent>
        {props.children}
      </DialogContent>
    </Dialog>
  );
};

FullScreenDialog.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.shape().isRequired,
  onBackClick: PropTypes.func,
  onClose: PropTypes.func,
  onCloseClick: PropTypes.func,
  open: PropTypes.bool,
  showBack: PropTypes.bool,
  showClose: PropTypes.bool,
  title: PropTypes.string.isRequired,
};

FullScreenDialog.defaultProps = {
  open: false,
  showBack: false,
  showClose: false,
};

export default withStyles(styles)(FullScreenDialog);
