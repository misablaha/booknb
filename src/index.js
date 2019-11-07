import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import ReactDOM from 'react-dom';
import App from './App';
import redux from './store';

ReactDOM.render(
  <Provider store={redux}>
    <Router>
      <App/>
    </Router>
  </Provider>,
  document.getElementById('root')
);
