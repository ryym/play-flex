/**
 * PlaygroundState manages the state of playground where users
 * put flex containers and flex items. But the class itself
 * has no state. So subclasses have to implement two methods:
 * 'getState()' and 'setState()'.
 */
export default class PlaygroundState {
  /**
   * Add a given item to the specified container.
   * @param {FlexItem} item - A FlexItem to be added.
   * @param {string} containerId - The parent container id.
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
}
