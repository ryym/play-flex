
export default class BoxTreeStateMapper {
  constructor(state) {
    this.state = state;
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

}
