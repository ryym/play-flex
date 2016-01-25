import Flexbox from '$shared/models/Flexbox';

/**
 * Extend a given state class for testing and return its subclass.
 * @param {StateClass} StateClass - The state class to be extended.
 * @param {Object} initialState - The initial state of the instance.
 * @return {StateClass} The subclass of the given class.
 */
export function createTestState(StateClass) {
  class TestState extends StateClass {
    constructor(initialState) {
      super();
      this.state = initialState;
    }

    getState() {
      return this.state;
    }

    setState(nextState) {
      Object.assign(this.state, nextState);
    }
  }

  return TestState;
}

export function makeBoxTree(...boxIds) {
  const boxes = {};
  boxIds.forEach(ids => {
    const [parent, childs] = ids;
    boxes[parent] = new Flexbox(parent);
    (childs || []).forEach(child => {
      boxes[parent].addChild(child);
    });
  });
  return {
    boxes,
    rootId: boxIds[0][0]
  };
}

