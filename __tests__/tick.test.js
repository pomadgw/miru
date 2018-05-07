jest.useFakeTimers();

describe('Tick', () => {
  test('runs interval', () => {
    const Miru = require('../src/index').default;

    const vm = new Miru({
      data() {
        return { number: 0 };
      },
    });

    const func = jest.fn();

    Miru.$nextTick(func);

    expect(setInterval).toHaveBeenCalledTimes(1);
  });

  test('runs function defined', () => {
    const Miru = require('../src/index').default;

    const vm = new Miru({});

    const callback = jest.fn();

    Miru.$nextTick(callback);
    expect(callback).not.toBeCalled();

    jest.runOnlyPendingTimers();

    expect(callback).toBeCalled();
    expect(callback).toHaveBeenCalledTimes(1);
  });
});
