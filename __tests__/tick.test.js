// import Miru from '../src';

jest.useFakeTimers();

describe('Tick', () => {
  test('runs', () => {
    const Miru = require('../src/index').default;

    const vm = new Miru({
      data() {
        return { number: 0 };
      }
    });

    Miru.$nextTick(() => {
      vm.number = 1;
    });

    expect(setInterval).toHaveBeenCalledTimes(1);

    Miru.$nextTick(() => {
      expect(vm.number).toBe(1);
    });
  })
});
