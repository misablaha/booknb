import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid/Grid';

import BookCard from '../../BookCard/BookCard';

const SearchResult = (props) => {
  return (
    <Grid container spacing={16}>
      {props.books.map(book => (
        <Grid item key={book._id} xs={12} md={6} lg={4}>
          <BookCard
            book={book}
            relations={props.relations[book._id]}
            onClick={() => props.onSelect(book)}
          />
        </Grid>
      ))}
    </Grid>
  );
};

SearchResult.propTypes = {
  books: PropTypes.arrayOf(PropTypes.shape),
  relations: PropTypes.object,
  onSelect: PropTypes.func.isRequired,
};

SearchResult.defaultProps = {
  books: [],
  relations: {},
};

export default SearchResult;
