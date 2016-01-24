import { alt } from '$app/libs/alt';
import FlexContainer from '$app/models/FlexContainer';
import PlaygroundActions from '$app/actions/PlaygroundActions';
import PlaygroundState from './states/PlaygroundState';

/**
 * PlaygroundStore is a Alt store for Canvas component.
 */
class PlaygroundStore extends PlaygroundState {
  constructor() {
    super();
    this.bindActions(PlaygroundActions);

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

export default alt.createStore(PlaygroundStore, 'canvasStore');
