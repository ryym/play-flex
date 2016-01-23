/**
 * FlexContainer represents a flex-container element.
 * It has flex-item ids array.
 */
export default class FlexContainer {
  constructor(id) {
    this._id = id;
    this.itemIds = [];
  }

  getId() {
    return this._id;
  }

  getItemIds() {
    return this.itemIds;
  }

  addItem(itemId) {
    this.itemIds.push(itemId);
  }
}
