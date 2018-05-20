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
});
