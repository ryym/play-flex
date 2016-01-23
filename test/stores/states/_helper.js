/**
 * Extend a given state class for testing and return its subclass.
 * @param {StateClass} StateClass - The state class to be extended.
 * @param {Object} initialState - The initial state of the instance.
 * @return {StateClass} The subclass of the given class.
 */
export function createTestState(StateClass, initialState) {
  class TestState extends StateClass {
    constructor() {
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
