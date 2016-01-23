/**
 * @fileoverview Create {@link PlaygroundStore} bound to PlaygroundActions.
 */
import alt from '$app/libs/alt';
import PlaygroundActions from '$app/actions/PlaygroundActions';
import PlaygroundState from './states/PlaygroundState';

/**
 * PlaygroundStore is a Alt store for Canvas component.
 */
class PlaygroundStore extends PlaygroundState {
  constructor() {
    super();
    this.bindActions(PlaygroundActions);
  }
}

export default alt.createStore(PlaygroundStore, 'canvasStore');
