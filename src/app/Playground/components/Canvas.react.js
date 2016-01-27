import React from 'react';
import BoxTreeActions from '$shared/actions/BoxTreeActions';
import Flexbox from '$shared/models/Flexbox';
import Box from './Box';

let _boxId = 0;

/**
 * Render a canvas where users put flex containers and items.
 */
export default class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.renderBox = this.renderBox.bind(this);
    this.addChild = this.addChild.bind(this);
  }

  render() {
    const { mapBoxes } = this.props;
    return (
      <div className="pg-canvas">
        {mapBoxes(this.renderBox)}
      </div>
    );
  }

  renderBox(box, childBoxes) {
    return (
      <Box
        key={box.getId()}
        box={box}
        addChild={this.addChild}
      >
        {childBoxes}
      </Box>
    );
  }

  addChild(parentId) {
    const box = new Flexbox(_boxId++);
    BoxTreeActions.addBox({ box, parentId });
  }
}
