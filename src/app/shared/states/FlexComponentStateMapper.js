/**
 * State mapper provides efficient ways to access a current state.
 * Mapper never changes the state and it is the only way to access
 * the state from external components.
 */
export default class FlexComponentStateMapper {
  constructor(currentState) {
    this.state = currentState;
    this.mapComponents = this.mapComponents.bind(this);
  }

  /**
   * Traverse component tree.
   * @param {function} mapContainer
   * @param {function} mapItem
   * @return {*}
   */
  mapComponents(mapContainer, mapItem) {
    const state = this.state;
    const root = state.containers[state.rootContainerId];
    const mappers = { mapContainer, mapItem };
    return this._traverseContainer(state, root, mappers);
  }

  _traverseContainer(state, container, mappers) {
    const mappedItems = container.getItemIds().map(id => {
      const item = state.items[id];
      return this._traverseItem(state, item, mappers);
    });
    return mappers.mapContainer(container, mappedItems);
  }

  _traverseItem(state, item, mappers) {
    if (item.hasContainer()) {
      const container = state.containers[item.getContainerId()];
      const mappedContainer = this._traverseContainer(
        state, container, mappers
      );
      return mappers.mapItem(item, mappedContainer);
    }
    else {
      return mappers.mapItem(item);
    }
  }
}
