import Miru from '../src';

describe('Components', () => {
  test('can inject component', () => {
    const comp = {
      name: 'comp',
      data() {
        return { comicName: 'Cardcaptor Sakura' };
      },
      render(h) {
        return <div id="comic">{this.comicName}</div>;
      },
    };

    const vm = new Miru({
      components: { comp },
      render(h) {
        return <comp />;
      }
    });

    document.body.innerHTML = `<div id="app"></div>`;

    vm.$mount('#app');

    const dom = document.querySelector('#comic');
    expect(dom).not.toBeNull();
    expect(dom.textContent).toBe('Cardcaptor Sakura');
  });

  test('can inject component with no name specified', () => {
    const beatles = {
      data() {
        return { comicName: 'Cardcaptor Sakura' };
      },
      render(h) {
        return <div id="comic">{this.comicName}</div>;
      },
    };

    const vm = new Miru({
      components: { beatles },
      render(h) {
        return <beatles />;
      }
    });

    document.body.innerHTML = `<div id="app"></div>`;

    vm.$mount('#app');

    const dom = document.querySelector('#comic');
    expect(dom).not.toBeNull();
    expect(dom.textContent).toBe('Cardcaptor Sakura');
  });

  test('can render component as child', () => {
    const comp = {
      name: 'comp',
      data() {
        return { comicName: 'Cardcaptor Sakura' };
      },
      render(h) {
        return <div id="comic">{this.comicName}</div>;
      },
    };

    const vm = new Miru({
      components: { comp },
      render(h) {
        return <div><comp /></div>;
      }
    });

    document.body.innerHTML = `<div id="app"></div>`;

    vm.$mount('#app');

    const dom = document.querySelector('#comic');
    expect(dom).not.toBeNull();
    expect(dom.textContent).toBe('Cardcaptor Sakura');
  });

  test('can inject more than one component', () => {
    const comp1 = {
      name: 'comp1',
      data() {
        return { comicName: 'Cardcaptor Sakura' };
      },
      render(h) {
        return <div id="comic1">{this.comicName}</div>;
      },
    };


    const comp2 = {
      name: 'comp2',
      data() {
        return { comicName: 'Cardcaptor Sakura: Clear Card' };
      },
      render(h) {
        return <div id="comic2">{this.comicName}</div>;
      },
    };

    const vm = new Miru({
      components: { comp1, comp2 },
      render(h) {
        return <div>
          <comp1 />
          <comp2 />
        </div>;
      }
    });

    document.body.innerHTML = `<div id="app"></div>`;

    vm.$mount('#app');

    let dom = document.querySelector('#comic1');
    expect(dom).not.toBeNull();
    expect(dom.textContent).toBe('Cardcaptor Sakura');

    dom = document.querySelector('#comic2');
    expect(dom).not.toBeNull();
    expect(dom.textContent).toBe('Cardcaptor Sakura: Clear Card');
  });

  test('can rerender component when its data is changed', () => {
    const comp = new Miru({
      name: 'comp',
      data() {
        return { comicName: 'Cardcaptor Sakura' };
      },
      render(h) {
        return <div id="comic">{this.comicName}</div>;
      },
    });

    const vm = new Miru({
      components: { comp },
      render(h) {
        return <div><comp /></div>;
      }
    });

    document.body.innerHTML = `<div id="app"></div>`;

    vm.$mount('#app');

    comp.comicName = 'Bleach';

    const dom = document.querySelector('#comic');
    expect(dom).not.toBeNull();
    expect(dom.textContent).toBe('Bleach');
  });
  test('each component instance different', () => {
    const vm = new Miru({
      components: {
        'test': {
          props: ['prop'],
          render(h) {
            return <div class="testProp">{this.prop}</div>;
          }
        }
      },
      data: {
        number: 1289
      },
      render(h) {
        return <div>
            <test prop={100} />
            <test prop={200} />
          </div>;
      }
    })

    document.body.innerHTML = `<div id="app"></div>`;

    vm.$mount('#app');

    vm.number = 10000;

    const dom = document.getElementsByClassName('testProp');
    expect(dom.length).toBe(2);
    expect(dom[0].textContent).toBe('100');
    expect(dom[1].textContent).toBe('200');
  });
});
