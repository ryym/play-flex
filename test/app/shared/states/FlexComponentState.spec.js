import assert from 'power-assert';
import FlexContainer from '$shared/models/FlexContainer';
import FlexItem from '$shared/models/FlexItem';
import FlexComponentState from '$shared/states/FlexComponentState';
import * as h from './_helper';

const TestFlexComponentState = h.createTestState(FlexComponentState);

/**
 * @test {FlexComponentState}
 */
describe('FlexComponentState', function() {
  const rootId = 'root-container';
  let rootContainer;
  let componentTree;

  function run(execution) {
    execution();
    return componentTree.getState();
  }

  beforeEach(() => {
    rootContainer = new FlexContainer(rootId);
    componentTree = new TestFlexComponentState({
      rootContainerId: rootId,
      containers: { [rootId]: rootContainer },
      items: {}
    });
  });

  /** @test {FlexComponentState#constructor} */
  it('has an initial state', () => {
    const state = componentTree.getState();
    assert.deepEqual(state, {
      rootContainerId: rootId,
      containers: { [rootId]: rootContainer },
      items: {}
    });
  });

  /** @test {FlexComponentState#addItem} */
  describe('#addItem', () => {
    it('does nothing if the parent container id is not found', () => {
      const state = componentTree.getState();
      const nextState = run(() => {
        componentTree.addItem({
          item: new FlexItem(''),
          containerId: '__nowhere__'
        });
      });

      assert.deepEqual(nextState, state);
    });

    it('adds a given item to items hash', () => {
      const item = new FlexItem('new-item');
      const nextState = run(() => {
        componentTree.addItem({
          item, containerId: rootId
        });
      });

      assert.deepEqual(nextState.items, {
        [item.getId()]: item
      });
    });

    it('adds a given item id to the parent container', () => {
      const item = new FlexItem('new-item');
      componentTree.addItem({
        item, containerId: rootId
      });

      assert.deepEqual(
        rootContainer.getItemIds(),
        [item.getId()]
      );
    });
  });

  /** @test {FlexComponentState#putContainer} */
  describe('#putContainer', () => {
    const parentItemId = 'parent-item';

    beforeEach(() => {
      const parentItem = new FlexItem(parentItemId);
      componentTree.getState().items[parentItemId] = parentItem;
    });

    it('does nothing if the parent item id is not found', () => {
      const state = componentTree.getState();
      const nextState = run(() => {
        componentTree.putContainer({
          container: new FlexContainer(''),
          itemId: '__nowhere__'
        });
      });

      assert.deepEqual(nextState, state);
    });

    it('adds the given container to containers hash', () => {
      const container = new FlexContainer('new-container');
      const nextState = run(() => {
        componentTree.putContainer({
          container, itemId: parentItemId
        });
      });

      assert.deepEqual(nextState.containers, {
        [container.getId()]: container,
        [rootId]: rootContainer
      });
    });

    it('puts the given container id to the parent item', () => {
      const container = new FlexContainer('new-container');
      const nextState = run(() => {
        componentTree.putContainer({
          container, itemId: parentItemId
        });
      });

      const parentItem = nextState.items[parentItemId];
      assert.equal(
        parentItem.getContainerId(),
        'new-container'
      );
    });

    context('when the receiver item has a container already', () => {
      beforeEach(() => {
        const container = new FlexContainer('first');
        const state = componentTree.getState();
        state.items[parentItemId].putContainer(container);
      });

      it('does nothing', () => {
        const container = new FlexContainer('second');
        const state = componentTree.getState();
        const nextState = run(() => {
          componentTree.putContainer({
            container, itemId: parentItemId
          });
        });

        assert.deepEqual(nextState, state);
      });

    });
  });
});
