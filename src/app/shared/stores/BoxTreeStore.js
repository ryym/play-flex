import { alt } from '$shared/libs/alt';
import Flexbox from '$shared/models/Flexbox';
import BoxTreeActions from '$shared/actions/BoxTreeActions';
import BoxTreeState from '$shared/states/BoxTreeState';
import BoxTreeStateMapper from '$shared/states/BoxTreeStateMapper';

/**
 * BoxTreeStore is a Alt store managing flex component tree.
 */
class BoxTreeStore extends BoxTreeState {
  constructor() {
    super();
    this.bindActions(BoxTreeActions);

    const root = new Flexbox('__root__');
    this.rootId = root.getId();
    this.boxes = { [this.rootId]: root };
  }

  getState() {
    return this;
  }
}

BoxTreeStore.config = {
  // Override the accessor method.
  getState(state) {
    return new BoxTreeStateMapper(state);
  }
};

export default alt.createStore(BoxTreeStore, 'boxTreeStore');

