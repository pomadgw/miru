import h from '../src/utils/h';

describe('h', () => {
  test('parse simple jsx', () => {
    const dom = <div id="test"></div>;

    expect(dom.data.props).toBeDefined();
    expect(dom.data.props.id).toBe('test');
  });

  test('parse simple jsx with class', () => {
    const dom = <div class="test" />;

    expect(dom.data.class).toBeDefined();
    expect(dom.data.class.test).toBeDefined();
    expect(dom.data.class.test).toBe(true);
  });

  test('parse simple jsx with style', () => {
    const dom = <div style="color:  blue; text-align: center;" />;

    expect(dom.data.style).toBeDefined();
    expect(dom.data.style.color).toBeDefined();
    expect(dom.data.style.color).toBe('blue');

    expect(dom.data.style['text-align']).toBeDefined();
    expect(dom.data.style['text-align']).toBe('center');
  });

  test('parse children and have correct number of children', () => {
    const dom = <div id="test">
      <span>Hello</span>
      <span>Hello</span>
    </div>;

    expect(dom.children.length).toBe(2);
  });

  test('add event listener ', () => {
    const dom = <button on-click="true" id="test">
      </button>;

    expect(dom.data.on).toBeDefined();
    expect(dom.data.on.click).toBeDefined();
  });
});
