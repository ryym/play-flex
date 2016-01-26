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
        <div className="pg-playground__draggable">
          <div
            className="pg-playground__draggable-box"
            draggable="true"
            onDragStart={this.handleDragStart}
          >
            box
          </div>
        </div>
        <Canvas mapBoxes={mapBoxes} />
      </div>
    );
  }

  handleDragStart(e) {
    e.dataTransfer.effectAllowed = 'move';

    // NOTE: In Firefox, we can't drag elements without setting some data.
    e.dataTransfer.setData('text', 'ADD_CHILD');
  }
}

