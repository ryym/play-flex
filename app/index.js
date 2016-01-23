import React from 'react';
import ReactDOM from 'react-dom';
import Router, { Route } from 'react-router';
import Layout from './components/Layout';
import Playground from './components/Playground';

require('./style.scss');

ReactDOM.render(
  <Router>
    <Route component={Layout}>
      <Route path="/" component={Playground} />
    </Route>
  </Router>
  ,
  document.getElementById('app')
);
