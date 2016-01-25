import React from 'react';
import Header from './components/Header';

/**
 * Render common layout of this app.
 */
export default class Layout extends React.Component {
  render() {
    return (
      <div className="layout">
        <div className="layout-center">
          <Header />
          <div className="layout__main">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

