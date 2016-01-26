import assert from 'power-assert';
import Flexbox from '$shared/models/Flexbox';
import BoxTreeState from '$shared/states/BoxTreeState';
import * as h from './_helper';

const TestBoxTreeState = h.createTestState(BoxTreeState);

/**
 * @test {BoxTreeState}
 */
describe('BoxTreeState', function() {
  const rootId = 'root-container';
  let root;
  let boxTree;

  function run(execution) {
    execution();
    return boxTree.getState();
  }

  beforeEach(() => {
    root = new Flexbox(rootId);
    boxTree = new TestBoxTreeState({
      rootId: rootId,
      boxes: { [rootId]: root }
    });
  });

  /** @test {BoxTreeState#constructor} */
  it('has an initial state', () => {
    const state = boxTree.getState();
    assert.deepEqual(state, {
      rootId: rootId,
      boxes: { [rootId]: root }
    });
  });

  /** @test {BoxTreeState#addBox} */
  describe('#addBox', () => {
    it('does nothing if the parent box id is not found', () => {
      const state = boxTree.getState();
      const nextState = run(() => {
        boxTree.addBox({
          child: new Flexbox(''),
          parentId: '__nowhere__'
        });
      });

      assert.deepEqual(nextState, state);
    });

    it('adds a given box to the instance set', () => {
      const box = new Flexbox('new-item');
      const nextState = run(() => {
        boxTree.addBox({
          box, parentId: rootId
        });
      });

      assert.deepEqual(nextState.boxes, {
        [rootId]: root,
        [box.getId()]: box
      });
    });

    it('adds a given box id to the parent box', () => {
      const box = new Flexbox('new-item');
      boxTree.addBox({
        box, parentId: rootId
      });

      assert.deepEqual(
        root.getChildIds(),
        [box.getId()]
      );
    });
  });

});
