import React from 'react';
import AltContainer from 'alt-container';
import playgroundStore from '$app/stores/PlaygroundStore';

class Playground extends React.Component {
  render() {
    return (
      <div className="playground">
        playground
      </div>
    );
  }
}

export default props => {
  return (
    <AltContainer store={playgroundStore}>
      <Playground {...props} />
    </AltContainer>
  );
};
