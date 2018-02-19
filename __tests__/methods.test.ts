import Miru from '../src/index';

describe('Miru', () => {
  describe('methods', () => {
    const vm: Miru.IMiru = new Miru({
      data: {
        count: 1
      },
      methods: {
        increase() {
          this.count += 1;
        }
      }
    });
    test('is defined', () => {
      expect(vm.increase).toBeDefined();
    });
    test('modify data value', () => {
      vm.increase();
      expect(vm.count).toBe(2);
    });
  })
})
