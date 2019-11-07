import React, { Fragment } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import FilterIcon from '@material-ui/icons/FilterList';
import BookFilter from './BookFilter';

class LongMenu extends React.Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <Fragment>
        <IconButton
          onClick={this.handleClick}
          color="inherit"
        >
          <FilterIcon color="inherit"/>
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={this.handleClose}
        >
          <BookFilter/>
        </Menu>
      </Fragment>
    );
  }
}

export default LongMenu;
