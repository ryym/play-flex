import React from 'react';
import Canvas from './Canvas';

/**
 * Render playground container.
 */
export default class Playground extends React.Component {
  render() {
    const { mapComponents } = this.props;
    return (
      <div className="playground">
        playground
        <Canvas mapComponents={mapComponents} />
      </div>
    );
  }
}

