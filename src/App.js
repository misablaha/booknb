import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';

import MenuAppBar from './components/MenuAppBar/MenuAppBar';
import BookList from './components/BookList/BookList';
import AddButton from './components/AddButton/AddButton';
import AddDialog from './components/AddBook/AddDialog';

import { addBook, closeAdd, openAdd } from './actions/add';
import { addActionSelector } from './selectors/addAction';
import { fetchMe } from './actions/user';
import { fetchBookList } from './actions/book';
import { fetchRelationList } from './actions/relation';
import { isLogged, meIsLoading, meSelector } from './selectors/user';
import { relationsAreLoading } from './selectors/relations';
import { booksAreLoading } from './selectors/books';

class App extends Component {
  componentWillMount() {
    this.props.fetchMe();
    this.props.fetchBookList();
    this.props.fetchRelationList();
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.isLoading && !nextProps.isLogged) {
      nextProps.history.push('/auth/google');
    }
  }

  render() {
    const props = this.props;

    if (props.isLoading) {
      return <div/>;

    } else {
      return (
        <div>
          <CssBaseline/>
          <MenuAppBar user={props.me}/>
          <BookList />
          <AddButton onClick={props.onOpenAdd}/>
          <AddDialog
            open={!!props.addAction}
            type={props.addAction}
            onClose={props.onCloseAdd}
            onConfirm={book => props.onAddBook(props.addAction, book)}
          />
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  addAction: addActionSelector(state),
  isLogged: isLogged(state),
  isLoading: meIsLoading(state) || booksAreLoading(state) || relationsAreLoading(state),
  me: meSelector(state),
});

const mapDispatchToProps = {
  onOpenAdd: openAdd,
  onCloseAdd: closeAdd,
  onAddBook: addBook,
  fetchMe,
  fetchBookList,
  fetchRelationList,
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(App);
