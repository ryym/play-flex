import assert from 'power-assert';
import FlexContainer from '$app/models/FlexContainer';
import PlaygroundState from '$app/stores/states/PlaygroundState';
import { createTestState } from './_helper';

const TestPlaygroundState = createTestState(PlaygroundState);

/**
 * @test {PlaygroundState}
 */
describe('PlaygroundState', function() {
  const rootId = 'root-container';
  let rootContainer;
  let playground;

  beforeEach(() => {
    rootContainer = new FlexContainer(rootId);
    playground = new TestPlaygroundState({
      rootContainerId: rootId,
      containers: { [rootId]: rootContainer },
      items: {}
    });
  });

  /** @test {PlaygroundState#constructor} */
  it('has an initial state', () => {
    const state = playground.getState();
    assert.deepEqual(state, {
      rootContainerId: rootId,
      containers: { [rootId]: rootContainer },
      items: {}
    });
  });
});
