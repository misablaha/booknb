import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid/Grid';

import BookCard from '../BookCard/BookCard';
import { bookListSelector } from '../../selectors/books';
import { relationsByBookSelector } from '../../selectors/relations';
import { bookPropTypes } from '../propTypes';

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 3,
  },
});

class BookList extends React.Component {

  handleSelect = (book) => {
    console.log(book);
  };

  render() {
    const { books, relations, classes } = this.props;

    return (
      <Grid container spacing={16} className={classes.root}>
        {books.map(book => (
          <Grid item key={book._id} xs={12} md={6} lg={4}>
            <BookCard
              book={book}
              relations={relations[book._id]}
              onClick={() => this.handleSelect(book)}
            />
          </Grid>
        ))}
      </Grid>
    );
  }
}

BookList.propTypes = {
  books: PropTypes.arrayOf(PropTypes.shape(bookPropTypes)),
  relations: PropTypes.object,
  isLoading: PropTypes.bool,
  classes: PropTypes.object.isRequired,
};

BookList.defaultProps = {
  books: [],
  relations: {},
  isLoading: false,
};

const mapStateToProps = (...args) => ({
  books: bookListSelector(...args),
  relations: relationsByBookSelector(...args),
  // isLoading: booksAreLoading(...args),
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps)
)(BookList);
