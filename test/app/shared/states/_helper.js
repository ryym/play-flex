import FlexContainer from '$shared/models/FlexContainer';
import FlexItem from '$shared/models/FlexItem';

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
      this.state = nextState;
    }
  }

  return TestState;
}

export function container(id, itemIds = []) {
  const fc = new FlexContainer(id);
  itemIds.forEach(id => fc.addItem(id));
  return fc;
}

export function item(id, containerId) {
  const fi = new FlexItem(id);
  if (containerId !== null) {
    fi.putContainer(containerId);
  }
  return fi;
}

export function makeState(def) {
  function reduceComps(comps) {
    return comps.reduce((cs, c) => {
      cs[c.getId()] = c;
      return cs;
    }, {});
  }
  return {
    rootContainerId: def.containers[0].getId(),
    containers: reduceComps(def.containers),
    items: reduceComps(def.items)
  };
}
