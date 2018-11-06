import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import Menu from '@material-ui/core/Menu/Menu';
import PropTypes from 'prop-types';

import { OFFER, REQUIRE, SUGGEST } from '../../actions/add';

const styles = theme => ({
  root: {
    position: 'fixed',
    right: theme.spacing.unit * 3,
    bottom: theme.spacing.unit * 3,
  },
});

class AddButton extends Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = type => () => {
    this.setState({ anchorEl: null });
    if (type) this.props.onClick(type);
  };

  render() {
    const { anchorEl } = this.state;
    const { classes } = this.props;
    const open = Boolean(anchorEl);

    return (
      <div>
        <Button
          variant="fab"
          color="secondary"
          aria-label="More"
          aria-owns={open ? 'long-menu' : null}
          aria-haspopup="true"
          className={classes.root}
          onClick={this.handleClick}
        >
          <AddIcon/>
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={this.handleClose()}
          disableRestoreFocus
        >
          <MenuItem onClick={this.handleClose(OFFER)}>
            {'Můžu půjčit'}
          </MenuItem>
          <MenuItem onClick={this.handleClose(REQUIRE)}>
            {'Sháním'}
          </MenuItem>
          <MenuItem onClick={this.handleClose(SUGGEST)}>
            {'Doporučuji k přečtení'}
          </MenuItem>
        </Menu>
      </div>
    );
  }
}

AddButton.propTypes = {
  classes: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default withStyles(styles)(AddButton);
