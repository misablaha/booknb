import React, { Component, Fragment } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';
import Progress from '@material-ui/core/LinearProgress';

import MainScreen from './screens/MainScreen';
import LoginScreen from './screens/LoginScreen';

import { fetchMe, fetchUserList } from './actions/user';
import { fetchBookList } from './actions/book';
import { fetchRelationList } from './actions/relation';
import { isLogged, meIsLoading, usersAreLoading } from './selectors/user';
import { relationsAreLoading } from './selectors/relations';
import { booksAreLoading } from './selectors/books';

class App extends Component {
  componentWillMount() {
    this.props.fetchMe();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.meIsLoading && !nextProps.meIsLoading) {
      // user was loaded
      if (nextProps.isLogged) {
        // user is logged => fetch data
        this.props.fetchBookList();
        this.props.fetchRelationList();
        this.props.fetchUserList();
      } else {
        // user is not logged => forward to login
        this.props.history.push('/auth');
      }
    } else if (this.props.dataAreLoading && !nextProps.dataAreLoading) {
      // data were loaded => forward to app
      this.props.history.push('/book');
    }
  }

  render() {
    return (
      <Fragment>
        <CssBaseline/>
        <Route exact path="/" component={Progress}/>
        <Route exact path="/auth" component={LoginScreen}/>
        <Route exact path="/book" component={MainScreen}/>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  isLogged: isLogged(state),
  meIsLoading: meIsLoading(state),
  dataAreLoading: booksAreLoading(state)
    || relationsAreLoading(state)
    || usersAreLoading(state),
});

const mapDispatchToProps = {
  fetchMe,
  fetchBookList,
  fetchRelationList,
  fetchUserList,
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(App);
