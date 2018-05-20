import Miru from '../src';

describe('Event', () => {
  test('can send simple one', () => {
    const vm = new Miru({
      data() {
        return {
          number: 0,
        };
      },
      methods: {
        update() {
          this.number += 1;
        }
      }
    });

    vm.$on('click', function click() {
      this.update();
    });

    vm.$emit('click');

    expect(vm.number).not.toBe(0);
    expect(vm.number).toBe(1);
  })
  test('event from jsx works', () => {
    const vm = new Miru({
      data() {
        return {
          number: 0,
        };
      },
      methods: {
        update() {
          this.number += 1;
        }
      },
      render(h) {
        return (
          <div>
            <div id="value">{this.number}</div>
            <button id="update" on-click={this.update}>+</button>
          </div>);
      }
    });

    document.body.innerHTML = `<div id="app"></div>`;

    vm.$mount('#app');

    document.getElementById('update').click();

    expect(vm.number).not.toBe(0);
    expect(vm.number).toBe(1);
  })
});
