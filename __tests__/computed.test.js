import Miru from '../src';

describe('Computed stuffs', () => {
  test('can computed', () => {
    const vm = new Miru({
      data: {
        number: 1,
      },
      computed: {
        twoTimes() {
          return this.number * 2;
        }
      }
    });

    expect(vm.twoTimes).toBe(2);
  });
  test('not called twice when its dependency are not changed', () => {
    let called = 0;
    const vm = new Miru({
      data: {
        number: 1,
        show: false
      },
      computed: {
        twoTimes() {
          called += 1;
          return this.number * 2;
        },
        text() {
          return this.show ? 'Yes' : 'No';
        }
      }
    });

    const newNumber = vm.twoTimes;
    const text = vm.text;
    const newNumber2 = vm.twoTimes;

    expect(called).toBe(1);
  });
  test('cat computed out of cotehr computed value', () => {
    const vm = new Miru({
      data: {
        number: 1,
      },
      computed: {
        twoTimes() {
          return this.number * 2;
        },
        fourTimes() {
          return this.twoTimes * 2;
        },
      }
    });

    expect(vm.fourTimes).toBe(4);

    vm.number = 3;
    expect(vm.fourTimes).toBe(12);
  });
});
