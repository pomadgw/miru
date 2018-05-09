import Miru from '../src';

describe('Watcher', () => {
  test('can be run', () => {
    let invoke = 0;
    const vm = new Miru({
      data: {
        number: 0
      },
      watch: {
        number(value) {
          invoke = 1;
        }
      }
    });

    vm.number = 10;
    expect(invoke).not.toBe(0);
    expect(invoke).toBe(1);
  });
  test('receive changed value', () => {
    let invoke = 0;
    const vm = new Miru({
      data: {
        number: 0
      },
      watch: {
        number(value) {
          invoke = value;
        }
      }
    });

    vm.number = 10;
    expect(invoke).not.toBe(0);
    expect(invoke).toBe(10);
  });
});
