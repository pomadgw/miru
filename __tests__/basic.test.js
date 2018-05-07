import Miru from '../src';

describe('Basic stuffs', () => {
  const vm = new Miru({
    data() {
      return { number: 1023 };
    },
    methods: {
      test() {
        return 10;
      },
      addOne() {
        this.number += 1;
      },
    },
  });
  const vm2 = new Miru({
    data: {
      data: 10,
    },
    methods: {
      test() {
        return 10;
      },
      addOne() {
        this.number += 1;
      },
    },
  });

  test('it has an data', () => {
    expect(vm.number).toBe(1023);
    expect(vm2.data).toBe(10);
  });

  test('it has an method', () => {
    expect(vm.test()).toBe(10);
  });

  test('its methods can access vm from this', () => {
    vm.addOne();
    expect(vm.number).toBe(1024);
  });
});
