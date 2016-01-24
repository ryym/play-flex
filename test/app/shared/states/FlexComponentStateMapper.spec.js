import assert from 'power-assert';
import FlexComponentStateMapper from '$shared/states/FlexComponentStateMapper';
import * as h from './_helper';

/**
 * @test {FlexComponentStateMapper}
 */
describe('FlexComponentStateMapper', function() {

  /** @test {FlexComponentStateMapper#mapComponents} */
  describe('#mapComponent', () => {
    function mapContainer(container, mappedItems) {
      return { [container.getId()]: mappedItems };
    }

    function mapItem(item, mappedContainer) {
      return { [item.getId()]: mappedContainer };
    }

    function testMapComponents(...expectations) {
      expectations.forEach(({ state, result }) => {
        it(`${JSON.stringify(result)}`, () => {
          const mapper = new FlexComponentStateMapper(state);
          const actualResult = mapper.mapComponents(mapContainer, mapItem);
          assert.deepEqual(actualResult, result);
        });
      });
    }

    testMapComponents(
      {
        state: h.makeState({
          containers: [
            h.container('c1', [])
          ],
          items: []
        }),
        result: { 'c1': [] }
      },
      {
        state: h.makeState({
          containers: [
            h.container('c1', ['i1', 'i2']),
            h.container('c2')
          ],
          items: [
            h.item('i1', 'c2'),
            h.item('i2')
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
        state: h.makeState({
          containers: [
            h.container('c1', ['i1']),
            h.container('c2', ['i2', 'i3']),
            h.container('c3', ['i4']),
            h.container('c4')
          ],
          items: [
            h.item('i1', 'c2'),
            h.item('i2', 'c3'),
            h.item('i3'),
            h.item('i4', 'c4')
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
