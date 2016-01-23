/**
 * FlexItem represents a flex-item elements.
 * It can have a single flex-container in it.
 */
export default class FlexItem {
  constructor(id) {
    this._id = id;
    this._containerId = undefined;
  }

  getId() {
    return this._id;
  }

  getContainerId() {
    return this._containerId;
  }

  hasContainer() {
    return this.getContainerId() !== undefined;
  }

  putContainer(containerId) {
    this._containerId = containerId;
  }
}
