import React from 'react';

/**
 * Render a flex box.
 */
export default class Box extends React.Component {
  render() {
    const { box, addChild } = this.props;
    const boxId = box.getId();
    return (
      <div className="pg-canvas__flexbox">
        <div>
          <button onClick={() => addChild(boxId)}>
            add
          </button>
        </div>
        <div>box {boxId}</div>
        {this.props.children}
      </div>
    );
  }
}
