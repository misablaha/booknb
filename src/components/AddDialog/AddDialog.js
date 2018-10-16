import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import Slide from '@material-ui/core/Slide/Slide';
import TextField from '@material-ui/core/TextField';

import BookCard from '../BookCard/BookCard';
import FullScreenDialogHeader from './FullScreenDialogHeader';

import { addBook, OFFER, REQUIRE, SUGGEST } from '../../actions/add';
import { fetchSearch } from '../../actions/search';
import { searchResultSelector, searchIsLoading } from '../../selectors/search';

const ENTER = 'Enter';

const Transition = (props) => (
  <Slide direction="left" {...props} />
);

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

  handleSelect = (book) => {
    this.props.addBook(this.state.type, book);
    this.handleClose();
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
    const { books, open, isLoading } = this.props;
    const { type } = this.state;

    return (
      <Dialog
        open={open}
        onClose={this.handleClose}
        aria-labelledby="simple-dialog-title"
        TransitionComponent={Transition}
        scroll={'paper'}
        fullScreen
      >
        <FullScreenDialogHeader
          type={type}
          showBack
          onBackClick={this.handleClose}
        />
        <DialogTitle id="simple-dialog-title" element="div">
          <TextField
            autoFocus
            label="Název knihy a (nebo) jméno autora"
            id="search"
            onChange={this.handleChange('search')}
            onKeyPress={ev => ev.key === ENTER && this.handleSearch()}
            margin="normal"
            autoComplete="off"
            // variant="filled"
            fullWidth
          />
          {isLoading && (
            <LinearProgress />
          )}
        </DialogTitle>
        <DialogContent>
          {books.length
            ? (
              <Grid container spacing={16}>
                {this.props.books.map(book => (
                  <Grid item key={book.id} xs={12} md={6} lg={4}>
                    <BookCard
                      {...book}
                      onClick={() => this.handleSelect(book)}
                    />
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
      </Dialog>
    );
  }
}

AddDialog.propTypes = {
  open: PropTypes.bool,
  type: PropTypes.oneOf([OFFER, REQUIRE, SUGGEST]),
  onClose: PropTypes.func,
  onConfirm: PropTypes.func,
  books: PropTypes.arrayOf(PropTypes.shape),
  isLoading: PropTypes.bool,
  searchBook: PropTypes.func.isRequired,
  addBook: PropTypes.func.isRequired,
};

AddDialog.defaultProps = {
  open: false,
  books: [],
};

const mapStateToProps = (...args) => ({
  books: searchResultSelector(...args),
  isLoading: searchIsLoading(...args),
});

const mapDispatchToProps = {
  searchBook: fetchSearch,
  addBook,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddDialog);
