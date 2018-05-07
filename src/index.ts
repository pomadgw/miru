// @flow

import 'setimmediate';

function setData(vm, data) {
  const isFunc = typeof data === 'function';
  const $data = isFunc ? data() : data;

  Object.keys($data).forEach((key) => {
    Object.defineProperty(vm, key, {
      get() {
        return $data[key];
      },
      set(value) {
        $data[key] = value;
      },
    });
  });
}

function setMethod(vm, methods) {
  const vmTmp = vm;
  Object.keys(methods).forEach((key) => {
    vmTmp[key] = methods[key].bind(vm);
  });
}

let callbacks = [];
let tickIsRunning = false;

function runCallbacks() {
  tickIsRunning = false;
  callbacks.slice(0).forEach((callback) => {
    callback();
  });

  callbacks.length = 0;
}

export default class Miru {
  constructor({ data = {}, methods = {} } = {}) {
    setData(this, data);
    setMethod(this, methods);
  }

  static $nextTick(func, context = null) {
    callbacks.push(() => {
      func.call(context);
    });

    if (!tickIsRunning) {
      tickIsRunning = true;
      setImmediate(runCallbacks);
    }
  }
}
