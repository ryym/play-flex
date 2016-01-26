import React from 'react';
import AltContainer from 'alt-container';
import BoxTreeStore from '$shared/stores/BoxTreeStore';

/**
 * Inject playground state to its children.
 */
export default class StateInjector extends React.Component {
  render() {
    return (
      <AltContainer
        stores={[BoxTreeStore]}
        inject={{
          mapBoxes: this.mapBoxes
        }}
      >
        {this.props.children}
      </AltContainer>
    );
  }

  mapBoxes() {
    return BoxTreeStore.getState().mapRecursively;
  }
}

