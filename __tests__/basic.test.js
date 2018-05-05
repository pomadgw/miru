import Miru from '../src';

describe('Basic stuffs', () => {
  const vm = new Miru({
    data() {
      return { number: 1023 };
    },
  });
  test('it has an data', () => {
    expect(vm.number).toBe(1023);
  });
});
