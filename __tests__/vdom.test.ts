import Miru from '../src/index';
import h from 'snabbdom/h';

describe('Miru', () => {
  describe('mount', () => {

    test('properly mount a simple app', () => {
      const vm = new Miru({
        data: {
          count: 1
        },
        render() {
          return h('div', { props: { id: 'test' } }, 'test')
        }
      });

      document.body.innerHTML = `
    <div id="app"></div>
    `;

      vm.$mount('#app');
      const dom = document.querySelector('#test');
      expect(dom).toBeDefined();
      expect(dom.innerHTML).toBe('test');
    })

    test('is able to injected data value into dom', () => {
      const vm = new Miru({
        data: {
          count: 1
        },
        render() {
          return h('div', { props: { id: 'test' } }, this.count)
        }
      });

      document.body.innerHTML = `
    <div id="app"></div>
    `;

      vm.$mount('#app');
      const dom = document.querySelector('#test');
      expect(dom).toBeDefined();
      expect(dom.innerHTML).toBe(`${vm.count}`);
    })
  })
})
