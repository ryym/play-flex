import React from 'react';
import FlexComponentActions from '$shared/actions/FlexComponentActions';
import FlexItem from '$shared/models/FlexItem';
import FlexContainer from '$shared/models/FlexContainer';

let _itemId = 0;
let _containerId = 0;

/**
 * Render a canvas where users put flex containers and items.
 */
export default class Canvas extends React.Component {
  render() {
    const componentTree = this.props.mapComponents(
      this.mapContainer.bind(this),
      this.mapItem.bind(this)
    );

    return (
      <div className="pg-canvas">
        {componentTree}
      </div>
    );
  }

  mapContainer(container, itemElements) {
    const containerId = container.getId();
    return (
      <div className="pg-canvas__flex-container">
        <div>
          <button onClick={() => this.addItem(containerId)}>
            add item
          </button>
        </div>
        <div>container {containerId}</div>
        {itemElements}
      </div>
    );
  }

  mapItem(item, containerElements) {
    const itemId = item.getId();
    return (
      <div key={item.getId()} className="pg-canvas__flex-item">
        <button onClick={() => this.putContainer(itemId)}>
          add container
        </button>
        <div>item {item.getId()}</div>
        {containerElements}
      </div>
    );
  }

  addItem(containerId) {
    const item = new FlexItem(_itemId++);
    FlexComponentActions.addItem({ item, containerId });
  }

  putContainer(itemId) {
    const container = new FlexContainer(_containerId++);
    FlexComponentActions.putContainer({
      container, itemId
    });
  }
}
