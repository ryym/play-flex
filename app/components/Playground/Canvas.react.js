import React from 'react';
import PlaygroundActions from '$app/actions/PlaygroundActions';
import FlexItem from '$app/models/FlexItem';

let _itemId = 0;

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
      <div>
        <div>canvas</div>
        {componentTree}
      </div>
    );
  }

  mapContainer(container, itemElements) {
    const containerId = container.getId();
    return (
      <div>
        <button onClick={() => this.addItem(containerId)}>
          add item
        </button>
        <div>container {containerId}</div>
        <ul>{itemElements}</ul>
      </div>
    );
  }

  mapItem(item, containerElements) {
    return (
      <li key={item.getId()}>
        <div>item {item.getId()}</div>
        {containerElements}
      </li>
    );
  }

  addItem(containerId) {
    const item = new FlexItem(_itemId++);
    PlaygroundActions.addItem({ item, containerId });
  }
}
