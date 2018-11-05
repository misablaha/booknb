import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LinearProgress from '@material-ui/core/LinearProgress';
import FullScreenDialog from '../FullScreenDialog/FullScreenDialog';
import SearchInput from './components/SearchInput';
import SearchResult from './components/SearchResult';

import { addBook, OFFER, REQUIRE, SUGGEST } from '../../actions/add';
import { fetchSearch } from '../../actions/search';
import { searchIsLoading, searchResultSelector } from '../../selectors/search';
import { relationsByBookSelector } from '../../selectors/relations';

const TITLE = {
  [OFFER]: 'Nabízím knihu k přečtení',
  [REQUIRE]: 'Sháním knihu k přečtení',
  [SUGGEST]: 'Doporučuji knihu k přečtení',
};

class AddDialog extends React.Component {
  state = {
    type: '',
    search: {},
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.type) this.setState({ type: nextProps.type });
  }

  resetState = () => this.setState({
    search: {},
  });

  handleSelect = (book) => {
    this.props.addBook(this.state.type, book);
    this.handleClose();
  };

  handleClose = () => {
    this.props.onClose();
    this.resetState();
  };

  render() {
    const { books, isLoading, onSearch, open, relations } = this.props;
    const { search, type } = this.state;

    return (
      <FullScreenDialog
        onBackClick={this.handleClose}
        open={open}
        showBack
        title={TITLE[type]}
      >
        <SearchInput
          onSearch={onSearch}
          value={search}
          onChange={search => this.setState({ search })}
        />
        {isLoading && (
          <LinearProgress/>
        )}
        <SearchResult
          onSelect={this.handleSelect}
          books={books}
          relations={relations}
        />
      </FullScreenDialog>
    );
  }
}

AddDialog.propTypes = {
  open: PropTypes.bool,
  type: PropTypes.oneOf([OFFER, REQUIRE, SUGGEST]),
  onClose: PropTypes.func,
  addBook: PropTypes.func.isRequired,
};

AddDialog.defaultProps = {
  open: false,
  books: [],
};

const mapStateToProps = (...args) => ({
  books: searchResultSelector(...args),
  relations: relationsByBookSelector(...args),
  isLoading: searchIsLoading(...args),
});

const mapDispatchToProps = {
  onSearch: fetchSearch,
  addBook,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddDialog);
