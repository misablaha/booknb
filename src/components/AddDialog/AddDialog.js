import React from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

import { OFFER_ADD, REQUIRE_ADD, SUGGEST_ADD } from '../../actions/add';
import Slide from '@material-ui/core/Slide/Slide';
import connect from 'react-redux/es/connect/connect';
import { searchBook } from '../../actions/search';
import Grid from '@material-ui/core/Grid/Grid';
import BookCard from '../BookCard/BookCard';
import { searchResultSelector } from '../../selectors/search';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const ENTER = 'Enter';

const styles = {
  appBar: {
    position: 'relative',
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  flex: {
    flex: 1,
  },
};

function Transition(props) {
  return <Slide direction="left" {...props} />;
}

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

  handleSearch = () => {
    this.props.searchBook(this.state.search);
  };

  handleClose = () => {
    this.props.onClose();
    this.resetState();
  };

  handleConfirm = () => {
    this.props.onConfirm(this.state.search);
    this.resetState();
  };

  render() {
    const { books, classes, open } = this.props;
    const { type } = this.state;
    const title = {
      [OFFER_ADD]: 'Nabízím knihu k přečtení',
      [REQUIRE_ADD]: 'Sháním knihu k přečtení',
      [SUGGEST_ADD]: 'Doporučuji knihu k přečtení',
    };

    return (
      <Dialog
        open={open}
        onClose={this.handleClose}
        aria-labelledby="simple-dialog-title"
        TransitionComponent={Transition}
        scroll={'paper'}
        fullScreen
      >
        <AppBar className={classes.appBar} color="default">
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              onClick={this.handleClose}
              aria-label="Close"
            >
              <ArrowBackIcon/>
            </IconButton>
            <Typography variant="title" color="inherit" className={classes.flex}>
              {title[type]}
            </Typography>
            <Button color="inherit" onClick={this.handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <DialogTitle id="simple-dialog-title" element="div">
          <TextField
            autoFocus
            label="Název knihy a (nebo) jméno autora"
            id="search"
            // value={this.state.title}
            onChange={this.handleChange('search')}
            onKeyPress={ev => {
              if (ev.key === ENTER) {
                this.handleSearch();
              }
            }}
            margin="normal"
            autoComplete="off"
            // variant="filled"
            fullWidth
          />
        </DialogTitle>
        <DialogContent>
          {books.length
            ? (
              <Grid container spacing={16}>
                {this.props.books.map(book => (
                  <Grid item key={book.code} xs={12} md={6} lg={4}>
                    <BookCard {...book}/>
                  </Grid>
                ))}
              </Grid>
            )
            : (
              <DialogContentText>
                Zadej název knihy a jméno autora zadej včetně diakritiky.
              </DialogContentText>
            )
          }
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
  searchBook: PropTypes.func.isRequired,
  books: PropTypes.arrayOf(PropTypes.shape),
};

AddDialog.defaultProps = {
  open: false,
  books: [],
};

const mapStateToProps = (...args) => ({
  books: searchResultSelector(...args)
});

const mapDispatchToProps = {
  searchBook,
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(AddDialog);
