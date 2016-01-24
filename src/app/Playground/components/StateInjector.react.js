import React from 'react';
import AltContainer from 'alt-container';
import FlexComponentStore from '$shared/stores/FlexComponentStore';

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
    return FlexComponentStore.getState().mapComponents;
  }
}

