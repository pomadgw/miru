import Miru from '../src';

describe('Virtual DOM', () => {
  test('can mount and render HTML', () => {
    const vm = new Miru({
      render(h) {
        return h('div', { props: { id: 'test' } }, ['test']);
      },
    });

    document.body.innerHTML = `<div id="app"></div>`;

    vm.$mount('#app');

    const dom = document.querySelector('#test');
    expect(dom).not.toBeNull();
    expect(dom.textContent).toBe('test');
  });

  test('can load data into DOM', () => {
    const vm = new Miru({
      data: {
        number: 10,
      },
      render(h) {
        return h('div', { props: { id: 'test' } }, [this.number]);
      },
    });

    document.body.innerHTML = `<div id="app"></div>`;

    vm.$mount('#app');

    const dom = document.querySelector('#test');
    expect(dom).not.toBeNull();
    expect(dom.textContent).toBe('10');
  });

  test('can rerender DOM when a data is changed', () => {
    const vm = new Miru({
      data: {
        number: 10,
      },
      render(h) {
        return h('div', { props: { id: 'test' } }, [this.number]);
      },
    });

    document.body.innerHTML = `<div id="app"></div>`;

    vm.$mount('#app');

    vm.number = 100;

    const dom = document.querySelector('#test');
    expect(dom).not.toBeNull();
    expect(dom.textContent).toBe('100');
  });

  test('can rerender DOM when a data is changed', () => {
    const vm = new Miru({
      data: {
        number: 20,
      },
      computed: {
        twoTimes() {
          return this.number * 2;
        },
      },
      render(h) {
        return h('div', { props: { id: 'test' } }, [this.twoTimes]);
      },
    });

    document.body.innerHTML = `<div id="app"></div>`;

    vm.$mount('#app');

    let dom = document.querySelector('#test');
    expect(dom).not.toBeNull();
    expect(dom.textContent).toBe('40');
  });
});
