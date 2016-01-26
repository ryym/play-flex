/**
 * BoxTreeState manages a state tree that
 * consists of {@link Flexbox}es.
 */
export default class BoxTreeState {
  /**
   * Add a given box to the specified box.
   * @param {Object} param
   * @param {Flexbox} param.box - A Flexbox to be added.
   * @param {string} param.parentId - The parent box id.
   * @return {void}
   */
  addBox({ box, parentId }) {
    const { boxes } = this.getState();
    const parent = boxes[parentId];
    if (parent === undefined) {
      return;
    }

    const boxId = box.getId();
    parent.addChild(boxId);
    boxes[boxId] = box;
    this.setState({ boxes });
  }
}
