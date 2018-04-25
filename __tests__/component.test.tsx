import Miru from '../src/index';

describe('component', () => {
  test('properly mounted into app', () => {
    const component: Miru.IMiru = new Miru({
      render() {
        return <div id="test">Test</div>;
      }
    });

    const vm: Miru.IMiru = new Miru({
      components: {
        component,
      },
      render() {
        return <div><component /></div>
      }
    });

    document.body.innerHTML = `
    <div id="app"></div>
    `;

    vm.$mount('#app');
    const dom = document.querySelector('#test');
    expect(dom).not.toBeNull();
    expect(dom.innerHTML).toBeDefined();
    expect(dom.innerHTML).toBe('Test');
  })
  test('pass data into component thru prop', () => {
    const component: Miru.IMiru = new Miru({
      props: ['number'],
      render() {
        return <div id="test-dd">{this.number}</div>;
      }
    });

    const vm: Miru.IMiru = new Miru({
      data: {
        count: 1,
      },
      components: {
        component,
      },
      render() {
        return <div><component number={this.count} /></div>
      }
    });

    document.body.innerHTML = `
    <div id="app"></div>
    `;

    vm.$mount('#app');
    const dom = document.querySelector('#test-dd');
    expect(dom).not.toBeNull();
    expect(dom.innerHTML).toBeDefined();
    expect(dom.innerHTML).toBe('1');
  })
  test("have data in prop when its value is changed form parent", () => {
    const component: Miru.IMiru = new Miru({
      props: ["number"],
      render() {
        return <div id="test-dd">{this.number}</div>;
      }
    });

    const vm: Miru.IMiru = new Miru({
      data: {
        count: 1
      },
      components: {
        component
      },
      render() {
        return (
          <div>
            <component number={this.count} />
          </div>
        );
      }
    });

    document.body.innerHTML = `
    <div id="app"></div>
    `;

    vm.$mount("#app");
    vm.count = 2;

    const dom = document.querySelector("#test-dd");
    expect(dom).not.toBeNull();
    expect(dom.innerHTML).toBeDefined();
    expect(dom.innerHTML).toBe("2");
  });

  test("have computed value changed when a prop value is changed", () => {
    const component: Miru.IMiru = new Miru({
      props: ["number"],
      computed: {
        numberTwo() {
          return this.number * 2;
        }
      },
      render() {
        return <div id="test-dd">{this.numberTwo}</div>;
      }
    });

    const vm: Miru.IMiru = new Miru({
      data: {
        count: 1
      },
      components: {
        component
      },
      render() {
        return (
          <div>
            <component number={this.count} />
          </div>
        );
      }
    });

    document.body.innerHTML = `
    <div id="app"></div>
    `;

    vm.$mount("#app");
    let dom = document.querySelector("#test-dd");
    expect(dom).not.toBeNull();
    expect(dom.innerHTML).toBeDefined();
    expect(dom.innerHTML).toBe("2");

    vm.count = 2;
    dom = document.querySelector("#test-dd");
    expect(dom).not.toBeNull();
    expect(dom.innerHTML).toBeDefined();
    expect(dom.innerHTML).toBe("4");
  });
});
