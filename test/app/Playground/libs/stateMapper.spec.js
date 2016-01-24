import assert from 'power-assert';
import { mapComponents } from '$app/Playground/libs/stateMapper';
import {
  container, item, makeState
} from '../_helper';

/**
 * @test Playground state mapper
 */
describe('Playground state mapper', function() {

  /** @test {mapComponents} */
  describe('mapComponents', () => {
    function mapContainer(container, mappedItems) {
      return {
        [container.getId()]: mappedItems
      };
    }

    function mapItem(item, mappedContainer) {
      return {
        [item.getId()]: mappedContainer
      };
    }

    function testMapComponents(...expectations) {
      expectations.forEach(({ state, result }) => {
        it(`${JSON.stringify(result)}`, () => {
          const actualResult = mapComponents(state, mapContainer, mapItem);
          assert.deepEqual(actualResult, result);
        });
      });
    }

    testMapComponents(
      {
        state: makeState({
          containers: [
            container('c1', [])
          ],
          items: []
        }),
        result: { 'c1': [] }
      },
      {
        state: makeState({
          containers: [
            container('c1', ['i1', 'i2']),
            container('c2')
          ],
          items: [
            item('i1', 'c2'),
            item('i2')
          ]
        }),
        result: {
          'c1': [
            { 'i1': { 'c2': [] } },
            { 'i2': null }
          ]
        }
      },
      {
        state: makeState({
          containers: [
            container('c1', ['i1']),
            container('c2', ['i2', 'i3']),
            container('c3', ['i4']),
            container('c4')
          ],
          items: [
            item('i1', 'c2'),
            item('i2', 'c3'),
            item('i3'),
            item('i4', 'c4')
          ]
        }),
        result: {
          'c1': [{
            'i1': {
              'c2': [{
                'i2': {
                  'c3': [
                    { 'i4': { 'c4': [] } }
                  ]
                }
              }, {
                'i3': null
              }]
            }
          }]
        }
      }
    );
  });

});
