import React, { Component } from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';

import MenuAppBar from './components/MenuAppBar/MenuAppBar';
import AddButton from './components/AddButton/AddButton';
import AddDialog from './components/AddDialog/AddDialog';

class App extends Component {
  state = {
    addType: null,
    result: [],
  };

  handleAddOpen = type => {
    this.setState({ addType: type });
  };

  handleAddClose = () => {
    this.setState({ addType: null });
  };

  handleAddConfirm = searchString => {
    console.log(this.state.addType, searchString);
    this.handleAddClose();
  };

  render() {
    return (
      <div className="App">
        <CssBaseline/>
        <MenuAppBar/>
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
