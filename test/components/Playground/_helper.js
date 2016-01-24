import assert from 'power-assert';
import FlexContainer from '$app/models/FlexContainer';
import FlexItem from '$app/models/FlexItem';

export function container(id, itemIds = []) {
  const fc = new FlexContainer(id);
  itemIds.forEach(id => fc.addItem(id));
  return fc;
}

export function item(id, containerId) {
  const fi = new FlexItem(id);
  if (containerId !== null) {
    fi.putContainer(containerId);
  }
  return fi;
}

export function makeState(def) {
  function reduceComps(comps) {
    return comps.reduce((cs, c) => {
      cs[c.getId()] = c;
      return cs;
    }, {});
  }
  return {
    rootContainerId: def.containers[0].getId(),
    containers: reduceComps(def.containers),
    items: reduceComps(def.items)
  };
}

export function testMapComponents(
  { mapComponents, mapContainer, mapItem },
  expectations
) {
  expectations.forEach(({ state, result }) => {
    it(`${JSON.stringify(result)}`, () => {
      const actualResult = mapComponents(state, mapContainer, mapItem);
      assert.deepEqual(actualResult, result);
    });
  });
}
