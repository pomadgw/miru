/** @jsx h */
import Miru from '../src/index';
import { mIf } from '../src/functions';

describe('Miru', () => {
  describe('hyper', () => {
    test('properly set styles', () => {
      const element = <div style="color: black">Test</div>;

      expect(element.data.style).toBeDefined();
      expect(element.data.style.color).toBe('black');
    })
  })
  test('can inject jsx', () => {
    const vm: Miru.IMiru = new Miru({
      data: {
        count: 1,
        show: false,
      },
      render() {
        const me = <div>Hello</div>;
        return (me);
      }
    });

    document.body.innerHTML = `
    <div id="app"></div>
    `;

    vm.$mount('#app');
    expect(document.body.textContent.trim()).toBe(`Hello`);
  })
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
    const dom = document.querySelector('#test');
    expect(dom.textContent).toBe('');
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
  test('is able to add event', () => {
    const vm: Miru.IMiru = new Miru({
      data: {
        count: 1,
        show: false,
      },
      methods: {
        onClick(event) {
          this.count += 1;
        }
      },
      render() {
        return <div id="test">
          <div id="count">{ this.count }</div>
          <button onclick={this.onClick} id="button">Click</button>
        </div>;
      }
    });

    document.body.innerHTML = `
    <div id="app"></div>
    `;

    vm.$mount('#app');
    const dom = document.querySelector('#count');
    expect(dom.textContent).toBe('1');
    document.getElementById('button').click();
    expect(dom.textContent).toBe('2');
  })
})
