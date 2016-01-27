
export default class BoxTreeStateMapper {
  constructor(state) {
    this.state = state;
    this.mapRecursively = this.mapRecursively.bind(this);
    this.mapFromParent = this.mapFromParent.bind(this);
  }

  mapRecursively(mapper, childReducer) {
    const root = this.state.boxes[this.state.rootId];
    return this._mapRecursively(root, mapper, childReducer);
  }

  _mapRecursively(box, mapper, childReducer) {
    const childs = box.getChildIds().map(id => {
      const child = this.state.boxes[id];
      return this._mapRecursively(child, mapper, childReducer);
    });
    if (typeof childReducer === 'function') {
      return mapper(box, childReducer(childs));
    }
    return mapper(box, childs);
  }

  /**
   * Traverse box tree from top to down. Using this method,
   * you can pass some arguments to children from its parent.
   * @param {function} mapBox - The mapper of each box.
   * @param {*} props - The prop passed to the root box.
   * @return {*} A tree consists of each mapped value.
   * @example
   * function printEachBox(box, parent, printEachBox, getChildsOf) {
   *   const boxId = box.getId();
   *   const mappedChilds = getChildsOf(box).map(child => {
   *     return printEachBox(child, boxId, printEachBox, getChildsOf);
   *   });
   *   console.log(`The parent of ${boxId} is ${parent}!`);
   * }
   * // Print each box id with its parent id.
   * const mapper = new BoxTreeStateMapper(state);
   * mapper.mapFromParent(printEachBox, 'not present');
   */
  mapFromParent(mapBox, props) {
    const root = this.state.boxes[this.state.rootId];
    return mapBox(root, props, mapBox, this.getChildsOf.bind(this));
  }

  getChildsOf(box) {
    return box.getChildIds().map(id => {
      return this.state.boxes[id];
    });
  }
}
