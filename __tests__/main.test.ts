import Miru from '../src/index';

describe('Miru', () => {
  test('run dummy test', () => {
    expect(true).toBe(true)
  })

  describe('data attribute', () => {
    test('create getter for accessing its content in object', () => {
      const count = 1;
      const vm = new Miru({
        data: {
          count
        }
      })

      expect(vm.count).toBe(count);
    })

    test('create getter for accessing its content in function that returns object', () => {
      const count = 1;
      const vm = new Miru({
        data() {
          return {
            count
          }
        }
      })

      expect(vm.count).toBe(count);
    })
  })
})
