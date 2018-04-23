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

      vm2.count = 1;
      expect(vm2.twoTimes).not.toBe(4);
      expect(vm2.twoTimes).toBe(2);
    });
    test("return corrects value when the depend computed value is changed", () => {
      const vm2: Miru.IMiru = new Miru({
        data: {
          count: 1
        },
        computed: {
          twoTimes() {
            return this.count * 2;
          },
          addThree() {
            return this.twoTimes + 3;
          }
        }
      });
      vm2.count = 2;
      expect(vm2.addThree).not.toBe(2);
      expect(vm2.addThree).toBe(7); // 2 * 2 + 3

      vm2.count = 1;
      expect(vm2.addThree).not.toBe(7);
      expect(vm2.addThree).toBe(5); // 1 * 2 + 3
    });
  });
});
