import React, { Component } from 'react';
import axios from 'axios';

import CssBaseline from '@material-ui/core/CssBaseline';

import MenuAppBar from './components/MenuAppBar/MenuAppBar';
import AddButton from './components/AddButton/AddButton';
import AddDialog from './components/AddDialog/AddDialog';
import BookCard from './components/BookCard/BookCard';

class App extends Component {
  state = {
    addType: null,
    result: [],
  };

  search = (searchString) => {
    axios
      .get('http://localhost:8080/search', {
        params: {
          q: searchString,
        }
      })
      .then(result => this.setState({ result: result.data.items || [] }))
      .catch(console.error);
  };

  handleAddOpen = type => {
    this.setState({ addType: type });
  };

  handleAddClose = () => {
    this.setState({ addType: null });
  };

  handleAddConfirm = searchString => {
    console.log(this.state.addType, searchString);
    this.search(searchString);
    this.handleAddClose();
  };

  render() {
    return (
      <div className="App">
        <CssBaseline/>
        <MenuAppBar/>
        {this.state.result.map(book => (
          <BookCard key={book.code} {...book}/>
        ))}
        <AddButton onClick={this.handleAddOpen}/>
        <AddDialog
          open={!!this.state.addType}
          type={this.state.addType}
          onClose={this.handleAddClose}
          onConfirm={this.handleAddConfirm}
        />
      </div>
    );
  }
}

export default App;
