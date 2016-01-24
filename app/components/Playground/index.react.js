import React from 'react';
import AltContainer from 'alt-container';
import playgroundStore from '$app/stores/PlaygroundStore';
import Canvas from './Canvas';
import * as stateMapper from './stateMapper';

/**
 * Render playground page.
 */
class Playground extends React.Component {
  render() {
    const { mapComponents } = this.props;
    return (
      <div className="playground">
        playground
        <Canvas mapComponents={mapComponents} />
      </div>
    );
  }
}

const stateInjector = {
  mapComponents() {
    const state = playgroundStore.getState();
    return (mapContainer, mapItem) => {
      return stateMapper.mapComponents(
        state, mapContainer, mapItem
      );
    };
  }
};

export default props => {
  return (
    <AltContainer
      stores={[playgroundStore]}
      inject={stateInjector}
    >
      <Playground {...props} />
    </AltContainer>
  );
};
