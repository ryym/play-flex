import React from 'react';
import BoxTreeActions from '$shared/actions/BoxTreeActions';
import Flexbox from '$shared/models/Flexbox';

let _boxId = 0;

/**
 * Render a canvas where users put flex containers and items.
 */
export default class Canvas extends React.Component {
  render() {
    const boxTree = this.props.mapBoxes(this.mapBox.bind(this));
    return (
      <div className="pg-canvas">
        {boxTree}
      </div>
    );
  }

  mapBox(box, childElements) {
    const boxId = box.getId();
    return (
      <div className="pg-canvas__flexbox">
        <div>
          <button onClick={() => this.addChild(boxId)}>
            add
          </button>
        </div>
        <div>box {boxId}</div>
        {childElements}
      </div>
    );
  }

  addChild(parentId) {
    const box = new Flexbox(_boxId++);
    BoxTreeActions.addBox({ box, parentId });
  }
}
