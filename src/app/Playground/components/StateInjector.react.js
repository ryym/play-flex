import React from 'react';
import AltContainer from 'alt-container';
import PlaygroundStore from '$app/stores/PlaygroundStore';
import * as stateMapper from './stateMapper';

/**
 * Inject playground state to its children.
 */
export default class StateInjector extends React.Component {
  render() {
    return (
      <AltContainer
        stores={[PlaygroundStore]}
        inject={{
          mapComponents: this.mapComponents
        }}
      >
        {this.props.children}
      </AltContainer>
    );
  }

  mapComponents() {
    const state = PlaygroundStore.getState();
    return (mapContainer, mapItem) => {
      return stateMapper.mapComponents(
        state, mapContainer, mapItem
      );
    };
  }
}

