import React from 'react';
import Header from './components/Header';

/**
 * Render common layout of this app.
 */
export default class Layout extends React.Component {
  render() {
    return (
      <div>
        <Header />
        {this.props.children}
      </div>
    );
  }
}
