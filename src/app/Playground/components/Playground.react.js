import React from 'react';
import Canvas from './Canvas';

/**
 * Render playground container.
 */
export default class Playground extends React.Component {
  render() {
    const { mapBoxes } = this.props;
    return (
      <div className="pg-playground">
        <Canvas mapBoxes={mapBoxes} />
      </div>
    );
  }
}

