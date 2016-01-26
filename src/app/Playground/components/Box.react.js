import React from 'react';

/**
 * Render a flex box.
 */
export default class Box extends React.Component {
  constructor(props) {
    super(props);
    this.handleDrop = this.handleDrop.bind(this);
  }

  render() {
    const { box } = this.props;
    const boxId = box.getId();
    return (
      <div
        className="pg-canvas__flexbox"
        onDragOver={e => e.preventDefault()}
        onDrop={e => this.handleDrop(e, boxId)}
      >
        <div>box {boxId}</div>
        {this.props.children}
      </div>
    );
  }

  handleDrop(e, boxId) {
    e.preventDefault();
    e.stopPropagation();

    const actionType = e.dataTransfer.getData('text');
    if (actionType === 'ADD_CHILD') {
      this.props.addChild(boxId);
    }
  }
}
