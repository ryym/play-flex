
export default class Flexbox {
  constructor(id) {
    this._id = id;
    this._childIds = [];
  }

  getId() {
    return this._id;
  }

  isEmpty() {
    return this._childIds.length === 0;
  }

  addChild(childId) {
    this._childIds.push(childId);
    return this;
  }

  getChildIds() {
    return this._childIds;
  }

  // traverse(visit) {
  //   const mappedChilds = this._childs.forEach(child => {
  //     return traverse(child);
  //   });
  //   return visit(this, mappedChilds);
  // }
}
