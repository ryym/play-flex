import assert from 'power-assert';
import FlexContainer from '$shared/models/FlexContainer';
import FlexItem from '$shared/models/FlexItem';
import FlexComponentState from '$shared/states/FlexComponentState';
import { createTestState } from './_helper';

const TestPlaygroundState = createTestState(FlexComponentState);

/**
 * @test {FlexComponentState}
 */
describe('FlexComponentState', function() {
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

  /** @test {FlexComponentState#constructor} */
  it('has an initial state', () => {
    const state = playground.getState();
    assert.deepEqual(state, {
      rootContainerId: rootId,
      containers: { [rootId]: rootContainer },
      items: {}
    });
  });

  /** @test {FlexComponentState#addItem} */
  describe('#addItem', () => {
    it('does nothing if the parent container id is not found', () => {
      const state = playground.getState();
      playground.addItem({
        item: new FlexItem(''),
        containerId: '__nowhere__'
      });

      assert.deepEqual(playground.getState(), state);
    });

    it('adds a given item to items hash', () => {
      const item = new FlexItem('new-item');
      playground.addItem({
        item, containerId: rootId
      });

      const items = playground.getState().items;
      assert.deepEqual(items, {
        [item.getId()]: item
      });
    });

    it('adds a given item id to the parent container', () => {
      const item = new FlexItem('new-item');
      playground.addItem({
        item, containerId: rootId
      });

      assert.deepEqual(
        rootContainer.getItemIds(),
        [item.getId()]
      );
    });
  });
});
