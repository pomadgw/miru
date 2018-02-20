import Miru from '../src/index';

describe('Miru', () => {
  describe('computed', () => {
    const vm: Miru.IMiru = new Miru({
      data: {
        count: 1
      },
      computed: {
        twoTimes() {
          return this.count * 2;
        }
      }
    });
    test('is defined', () => {
      expect(vm.twoTimes).toBeDefined();
    });
    test('return corrects value', () => {
      expect(vm.twoTimes).toBe(2);
    });
    test('return corrects value when the value is changed', () => {
      const vm2: Miru.IMiru = new Miru({
        data: {
          count: 1
        },
        computed: {
          twoTimes() {
            return this.count * 2;
          }
        }
      });
      vm2.count = 2;
      expect(vm2.twoTimes).not.toBe(2);
      expect(vm2.twoTimes).toBe(4);
    });
  })
})
