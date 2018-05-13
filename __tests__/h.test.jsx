import h from '../src/utils/h';

describe('h', () => {
  test('parse simple ', () => {
    const dom = <div id="test"></div>;

    expect(dom.data.props).toBeDefined();
  })
});
