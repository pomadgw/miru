import Miru from '../src';

describe('Virtual DOM', () => {
  test('can mount and render HTML', () => {
    const vm = new Miru({
      render(h) {
        return h('div', { props: { id: 'test' } }, ['test']);
      }
    });

    document.body.innerHTML = `<div id="app"></div>`;

    vm.$mount('#app');

    const dom = document.querySelector('#test');
    expect(dom).not.toBeNull();
    expect(dom.textContent).toBe('test');
  });
});
