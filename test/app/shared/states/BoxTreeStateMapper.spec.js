import assert from 'power-assert';
import BoxTreeStateMapper from '$shared/states/BoxTreeStateMapper';
import * as h from './_helper';

/**
 * @test {BoxTreeStateMapper}
 */
describe('BoxTreeStateMapper', function() {

  /** @test {BoxTreeStateMapper#mapRecursively} */
  describe('#mapRecursively', () => {
    function mapBox(box, reducedChilds) {
      return { [box.getId()]: reducedChilds };
    }

    function reduceChilds(mappedChilds) {
      return mappedChilds.reduce((set, child) => {
        return Object.assign(set, child);
      }, {});
    }

    function testMapRecursively(...expectations) {
      expectations.forEach(({ skip, state, result }) => {
        if (skip) {
          return;
        }
        it(`${JSON.stringify(result)}`, () => {
          const mapper = new BoxTreeStateMapper(state);
          const actualResult = mapper.mapRecursively(
            mapBox, reduceChilds
          );
          assert.deepEqual(actualResult, result);
        });
      });
    }

    testMapRecursively(
      {
        state: h.makeBoxTree(
          ['1', ['2']],
          ['2']
        ),
        result: {
          '1': { '2': [] }
        }
      },
      {
        state: h.makeBoxTree(
          ['1', ['2', '3']],
          ['2', ['4']],
          ['3'],
          ['4']
        ),
        result: {
          '1': {
            '2': {'4': []},
            '3': []
          }
        }
      },
      {
        state: h.makeBoxTree(
          ['1', ['2']],
          ['2', ['4', '5']],
          ['3', ['8']],
          ['4'],
          ['5', ['6', '7']],
          ['6', ['3']],
          ['7'],
          ['8']
        ),
        result: {
          '1': {
            '2': {
              '4': [],
              '5': {
                '6': {
                  '3': { '8': [] }
                },
                '7': []
              }
            }
          }
        }
      }
    );
  });

  /** @test {BoxTreeStateMapper#mapFromParent} */
  describe('#mapFromParent', () => {
    function mapBox(box, parent, mapBox, getChildsOf) {
      const data = getChildsOf(box).reduce((data, child) => {
        return Object.assign(
          data, mapBox(child, box.getId(), mapBox, getChildsOf)
        );
      }, { p: parent });
      return {
        [box.getId()]: data
      };
    }

    function testMapFromParent(...expectations) {
      expectations.forEach(({ skip, state, result }) => {
        if (skip) {
          return;
        }
        it(`${JSON.stringify(result)}`, () => {
          const mapper = new BoxTreeStateMapper(state);
          const actualResult = mapper.mapFromParent(mapBox);

          assert.deepEqual(actualResult, result);
        });
      });
    }

    testMapFromParent(
      {
        state: h.makeBoxTree(
          ['1', ['2']],
          ['2']
        ),
        result: {
          '1': {
            '2': { p: '1' },
            p: undefined
          }
        }
      },
      {
        state: h.makeBoxTree(
          ['1', ['2', '3']],
          ['2', ['4']],
          ['3'],
          ['4']
        ),
        result: {
          '1': {
            '2': {
              '4': { p: '2' },
              p: '1'
            },
            '3': { p: '1' },
            p: undefined
          }
        }
      },
      {
        state: h.makeBoxTree(
          ['1', ['2']],
          ['2', ['4', '5']],
          ['3', ['8']],
          ['4'],
          ['5', ['6', '7']],
          ['6', ['3']],
          ['7'],
          ['8']
        ),
        result: {
          '1': {
            '2': {
              '4': { p: '2' },
              '5': {
                '6': {
                  '3': {
                    '8': { p: '3' },
                    p: '6'
                  },
                  p: '5'
                },
                '7': { p: '5' },
                p: '2'
              },
              p: '1'
            },
            p: undefined
          }
        }
      }
    );
  });

});
