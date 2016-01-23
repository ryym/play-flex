import React from 'react';
import Router, { Route } from 'react-router';
import Layout from './Layout';
import Playground from './Playground';

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <Route component={Layout}>
          <Route path="/" component={Playground} />
        </Route>
      </Router>
    );
  }
}
