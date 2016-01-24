import React from 'react';
import Playground from './components/Playground';
import StateInjector from './components/StateInjector';

/**
 * Render playground page.
 */
export default props => {
  return (
    <StateInjector>
      <Playground {...props} />
    </StateInjector>
  );
};
