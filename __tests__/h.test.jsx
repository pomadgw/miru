import h from '../src/utils/h';

describe('h', () => {
  test('parse simple ', () => {
    const dom = <div id="test"></div>;

    expect(dom.data.props).toBeDefined();
  });

  test('parse simple ', () => {
    const dom = <div id="test">
      <span>Hello</span>
      <span>Hello</span>
    </div>;

    expect(dom.children.length).toBe(2);
  });
});
