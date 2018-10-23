import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid/Grid';

import BookCard from '../BookCard/BookCard';
import { bookListSelector } from '../../selectors/books';
import { relationsByBookSelector } from '../../selectors/relations';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 3,
  },
});

class BookList extends React.Component {

  handleSelect = (book) => {

  };

  render() {
    const { books, relations, classes } = this.props;

    return (
      <Grid container spacing={16} className={classes.root}>
        {books.map(book => (
          <Grid item key={book.id} xs={12} md={6} lg={4}>
            <BookCard
              {...book}
              relations={relations[book.id]}
              onClick={() => this.handleSelect(book)}
            />
          </Grid>
        ))}
      </Grid>
    );
  }
}

BookList.propTypes = {
  books: PropTypes.arrayOf(PropTypes.shape),
  relations: PropTypes.shape,
  isLoading: PropTypes.bool,
  classes: PropTypes.shape.isRequired,
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
