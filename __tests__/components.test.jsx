import Miru from '../src';

describe('Components', () => {
  test('can inject component', () => {
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
        return <comp />;
      }
    });

    document.body.innerHTML = `<div id="app"></div>`;

    vm.$mount('#app');

    const dom = document.querySelector('#comic');
    expect(dom).not.toBeNull();
    expect(dom.textContent).toBe('Cardcaptor Sakura');
  });
});
