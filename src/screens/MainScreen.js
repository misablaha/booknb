import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import MenuAppBar from '../components/MenuAppBar/MenuAppBar';
import BookList from '../components/BookList/BookList';
import AddButton from '../components/AddButton/AddButton';
import AddDialog from '../components/AddBook/AddDialog';

import { addBook, closeAdd, openAdd } from '../actions/add';
import { addActionSelector } from '../selectors/addAction';
import { meSelector } from '../selectors/user';

const MainScreen = (props) => {
  return (
    <Fragment>
      <MenuAppBar user={props.me}/>
      <BookList/>
      <AddButton onClick={props.onOpenAdd}/>
      <AddDialog
        open={!!props.addAction}
        type={props.addAction}
        onClose={props.onCloseAdd}
        onConfirm={book => props.onAddBook(props.addAction, book)}
      />
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  addAction: addActionSelector(state),
  me: meSelector(state),
});

const mapDispatchToProps = {
  onOpenAdd: openAdd,
  onCloseAdd: closeAdd,
  onAddBook: addBook,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
