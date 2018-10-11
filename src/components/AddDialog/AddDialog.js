import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

import { OFFER_ADD, REQUIRE_ADD, SUGGEST_ADD } from '../../actions/add';

const ENTER = 'Enter';

class AddDialog extends React.Component {
  state = {
    type: '',
    search: '',
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.type) this.setState({ type: nextProps.type });
  }

  resetState = () => this.setState({
    search: '',
  });

  handleChange = name => event => this.setState({
    [name]: event.target.value,
  });

  handleClose = () => {
    this.props.onClose();
    this.resetState();
  };

  handleConfirm = () => {
    this.props.onConfirm(this.state.search);
    this.resetState();
  };

  render() {
    const { open } = this.props;
    const { type } = this.state;
    const title = {
      [OFFER_ADD]: 'Nabízím knihu k přečtení',
      [REQUIRE_ADD]: 'Sháním knihu k přečtení',
      [SUGGEST_ADD]: 'Doporučuji knihu k přečtení',
    };

    return (
      <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" open={open}>
        <DialogTitle id="simple-dialog-title">{title[type]}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Název knihy a jméno autora zadej včetně diakritiky.
          </DialogContentText>
          <TextField
            autoFocus
            label="Název knihy a (nebo) jméno autora"
            id="search"
            // value={this.state.title}
            onChange={this.handleChange('search')}
            onKeyPress={ev => {
              if (ev.key === ENTER) {
                this.handleConfirm();
              }
            }}
            margin="normal"
            autoComplete="off"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Zavřít
          </Button>
          <Button onClick={this.handleConfirm} color="primary">
            Přidat
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

AddDialog.propTypes = {
  open: PropTypes.bool,
  type: PropTypes.oneOf([OFFER_ADD, REQUIRE_ADD, SUGGEST_ADD]),
  onClose: PropTypes.func,
  onConfirm: PropTypes.func,
};

AddDialog.defaultProps = {
  open: false,
};

export default AddDialog;
