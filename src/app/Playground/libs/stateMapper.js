/**
 * Traverse component tree.
 * @param {Object} state
 * @param {function} mapContainer
 * @param {function} mapItem
 * @return {*}
 */
export function mapComponents(state, mapContainer, mapItem) {
  const root = state.containers[state.rootContainerId];
  const mappers = { mapContainer, mapItem };
  return _traverseContainer(state, root, mappers);
}

function _traverseContainer(state, container, mappers) {
  const mappedItems = container.getItemIds().map(id => {
    const item = state.items[id];
    return _traverseItem(state, item, mappers);
  });
  return mappers.mapContainer(container, mappedItems);
}

function _traverseItem(state, item, mappers) {
  if (item.hasContainer()) {
    const container = state.containers[item.getContainerId()];
    const mappedContainer = _traverseContainer(state, container, mappers);
    return mappers.mapItem(item, mappedContainer);
  }
  else {
    return mappers.mapItem(item);
  }
}
