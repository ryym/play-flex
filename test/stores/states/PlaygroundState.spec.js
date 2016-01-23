/**
 * @fileoverview Unit tests for PlaygroundState
 */
import assert from 'power-assert';
import { createTestState } from './_helper';
import PlaygroundState from '$app/stores/states/PlaygroundState';

const rootContainer = 'root-container';

const TestPlaygroundState = createTestState(PlaygroundState, {
  rootContainer,
  containers: {},
  items: {}
});

/**
 * PlaygroundState Spec
 */
describe('PlaygroundState', function() {
  let playground;

  beforeEach(() => {
    playground = new TestPlaygroundState();
  });

  it('has an initial state', () => {
    const state = playground.getState();
    assert.deepEqual(state, {
      rootContainer,
      containers: {},
      items: {}
    });
  });
});
