/** @jsx h */
import Miru from '../src/index';
import { mIf } from '../src/functions';

describe('Miru', () => {
  test('is able to update dom with jsx', () => {
    const vm: Miru.IMiru = new Miru({
      data: {
        count: 1,
        show: false,
      },
      render() {
        const me = <div id="test">{this.count}</div>;
        return (me);
      }
    });

    document.body.innerHTML = `
    <div id="app"></div>
    `;

    vm.$mount('#app');
    vm.count = 2;
    const dom = document.querySelector('#test');
    expect(dom).toBeDefined();
    expect(dom.innerHTML).toBe(`${vm.count}`);
  })
  test('is able to update dom with if construction', () => {
    const vm: Miru.IMiru = new Miru({
      data: {
        count: 1,
        show: false,
      },
      render() {
        const me = <div id="test">
          {mIf(this.show,
            this.count
          )}
        </div>;
        return (me);
      }
    });

    document.body.innerHTML = `
    <div id="app"></div>
    `;

    vm.$mount('#app');
    vm.count = 2;
    const dom = document.querySelector('#test');
    expect(dom.textContent).toBe(``);
    vm.show = true;
    expect(dom.textContent).toBe(`${vm.count}`);
  })
  test('is able to update dom with if construction with else', () => {
    const vm: Miru.IMiru = new Miru({
      data: {
        count: 1,
        show: false,
      },
      render() {
        const me = <div id="test">
          {mIf(this.show,
            this.count,
            "Hidden"
          )}
        </div>;
        return (me);
      }
    });

    document.body.innerHTML = `
    <div id="app"></div>
    `;

    vm.$mount('#app');
    vm.count = 2;
    const dom = document.querySelector('#test');
    expect(dom.textContent).toBe(`Hidden`);
    vm.show = true;
    expect(dom.textContent).toBe(`${vm.count}`);
  })
})
