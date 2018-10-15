import React, { Component } from 'react';
import { connect } from 'react-redux';

import CssBaseline from '@material-ui/core/CssBaseline';

import MenuAppBar from './components/MenuAppBar/MenuAppBar';
import AddButton from './components/AddButton/AddButton';
import AddDialog from './components/AddDialog/AddDialog';

import { addBook, closeAdd, openAdd } from './actions/add';
import { addActionSelector } from './selectors/addAction';
import { fetchMe } from './actions/user';

class App extends Component {
  componentWillMount() {
    this.props.fetchMe();
  }

  render() {
    const props = this.props;

    return (
      <div>
        <CssBaseline/>
        <MenuAppBar/>
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

const mapStateToProps = (...args) => ({
  addAction: addActionSelector(...args),
});

const mapDispatchToProps = {
  onOpenAdd: openAdd,
  onCloseAdd: closeAdd,
  onAddBook: addBook,
  fetchMe,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
