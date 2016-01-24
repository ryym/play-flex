import React from 'react';
import AltContainer from 'alt-container';
import FlexComponentStore from '$shared/stores/FlexComponentStore';
import * as stateMapper from '../libs/stateMapper';

/**
 * Inject playground state to its children.
 */
export default class StateInjector extends React.Component {
  render() {
    return (
      <AltContainer
        stores={[FlexComponentStore]}
        inject={{
          mapComponents: this.mapComponents
        }}
      >
        {this.props.children}
      </AltContainer>
    );
  }

  mapComponents() {
    const state = FlexComponentStore.getState();
    return (mapContainer, mapItem) => {
      return stateMapper.mapComponents(
        state, mapContainer, mapItem
      );
    };
  }
}

