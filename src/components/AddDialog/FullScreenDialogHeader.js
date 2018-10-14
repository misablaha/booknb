import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { OFFER, REQUIRE, SUGGEST } from '../../actions/add';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CloseIcon from '@material-ui/icons/Close';

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

const title = {
  [OFFER]: 'Nabízím knihu k přečtení',
  [REQUIRE]: 'Sháním knihu k přečtení',
  [SUGGEST]: 'Doporučuji knihu k přečtení',
};

const FullScreenDialogHeader = (props) => {
  return (
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
          {title[props.type]}
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
  )
};

FullScreenDialogHeader.propTypes = {
  type: PropTypes.string.isRequired,
  showBack: PropTypes.bool,
  onBackClick: PropTypes.func,
  showClose: PropTypes.bool,
  onCloseClick: PropTypes.func,
  classes: PropTypes.shape().isRequired,
};

FullScreenDialogHeader.defaultProps = {
  showBack: false,
  showClose: false,
};

export default withStyles(styles)(FullScreenDialogHeader);
