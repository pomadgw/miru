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
})
