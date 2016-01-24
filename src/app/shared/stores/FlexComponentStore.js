import { alt } from '$shared/libs/alt';
import FlexContainer from '$shared/models/FlexContainer';
import FlexComponentActions from '$shared/actions/FlexComponentActions';
import FlexComponentState from '$shared/states/FlexComponentState';
import FlexComponentStateMapper from '$shared/states/FlexComponentStateMapper';

/**
 * FlexComponentStore is a Alt store managing flex component tree.
 */
class FlexComponentStore extends FlexComponentState {
  constructor() {
    super();
    this.bindActions(FlexComponentActions);

    const rootContainer = new FlexContainer('__root__');
    this.rootContainerId = rootContainer.getId();
    this.containers = {
      [this.rootContainerId]: rootContainer
    };
    this.items = {};
  }

  getState() {
    return this;
  }
}

FlexComponentStore.config = {
  // Override the accessor method.
  getState(state) {
    return new FlexComponentStateMapper(state);
  }
};

export default alt.createStore(FlexComponentStore, 'canvasStore');
