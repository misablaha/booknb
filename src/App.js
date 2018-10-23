import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';

import MenuAppBar from './components/MenuAppBar/MenuAppBar';
import BookList from './components/BookList/BookList';
import AddButton from './components/AddButton/AddButton';
import AddDialog from './components/AddDialog/AddDialog';

import { addBook, closeAdd, openAdd } from './actions/add';
import { addActionSelector } from './selectors/addAction';
import { fetchMe } from './actions/user';
import { isLogged, meIsLoading, meSelector } from './selectors/user';

class App extends Component {
  componentWillMount() {
    this.props.fetchMe();
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.meIsLoading && !nextProps.isLogged) {
      nextProps.history.push('/auth/google');
    }
  }

  render() {
    const props = this.props;

    if (props.meIsLoading) {
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

const mapStateToProps = (...args) => ({
  addAction: addActionSelector(...args),
  isLogged: isLogged(...args),
  meIsLoading: meIsLoading(...args),
  me: meSelector(...args),
});

const mapDispatchToProps = {
  onOpenAdd: openAdd,
  onCloseAdd: closeAdd,
  onAddBook: addBook,
  fetchMe,
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(App);
