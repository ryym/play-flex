import React from 'react';
import Playground from './Playground';
import StateInjector from './StateInjector';

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
