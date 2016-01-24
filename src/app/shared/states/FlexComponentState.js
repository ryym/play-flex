/**
 * FlexComponentState manages a flex component tree that
 * consists of flex containers and items.
 * This class itself has no state so subclasses have to
 * implement two methods: 'getState()' and 'setState()'.
 */
export default class FlexComponentState {
  /**
   * Add a given item to the specified container.
   * @param {Object} param
   * @param {FlexItem} param.item - A FlexItem to be added.
   * @param {string} param.containerId - The parent container id.
   * @return {void}
   */
  addItem({ item, containerId }) {
    const { items, containers } = this.getState();
    const parent = containers[containerId];
    if (parent === undefined) {
      return;
    }

    const itemId = item.getId();
    parent.addItem(itemId);
    items[itemId] = item;
    this.setState({
      items, containers
    });
  }

  /**
   * Put a given container in the specified item.
   * @param {Object} param
   * @param {FlexContainer} param.container - A FlexContainer to be added.
   * @param {string} param.itemId - The parent item id.
   * @return {void}
   */
  putContainer({ container, itemId }) {
    const { items, containers } = this.getState();
    const parent = items[itemId];
    if (parent === undefined || parent.hasContainer()) {
      return;
    }

    const containerId = container.getId();
    parent.putContainer(containerId);
    containers[containerId] = container;
    this.setState({
      items, containers
    });
  }
}
