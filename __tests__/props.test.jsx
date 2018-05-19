import Miru from '../src';

describe('Component: Props', () => {
  test('can fetch props', () => {
    const vm = new Miru({
      components: {
        'test': {
          props: [ 'prop' ],
          render(h) {
            return <div id="testProp">{this.prop}</div>;
          }
        }
      },
      data: {
        number: 1289
      },
      render(h) {
        return <test prop={this.number} />;
      }
    })

    document.body.innerHTML = `<div id="app"></div>`;

    vm.$mount('#app');

    const dom = document.querySelector('#testProp');
    expect(dom.textContent).toBe('1289');
  });
  test('rerender on prop changes', () => {
    const vm = new Miru({
      components: {
        'test': {
          props: ['prop'],
          render(h) {
            return <div id="testProp">{this.prop}</div>;
          }
        }
      },
      data: {
        number: 1289
      },
      render(h) {
        return <test prop={this.number} />;
      }
    })

    document.body.innerHTML = `<div id="app"></div>`;

    vm.$mount('#app');

    vm.number = 10000;

    const dom = document.querySelector('#testProp');
    expect(dom.textContent).not.toBe('1289');
    expect(dom.textContent).toBe('10000');
  });

  test('computed can use props', () => {
    const vm = new Miru({
      components: {
        'test': {
          props: ['prop'],
          computed: {
            twice() {
              return this.prop * 2;
            }
          },
          render(h) {
            return <div id="testProp">{this.twice}</div>;
          }
        }
      },
      data: {
        number: 123
      },
      render(h) {
        return <test prop={this.number} />;
      }
    });

    document.body.innerHTML = `<div id="app"></div>`;

    vm.$mount('#app');

    const dom = document.querySelector('#testProp');
    expect(dom.textContent).toBe('246');
  })
})
