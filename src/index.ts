// @flow
import nextTick from './utils/tick';

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

function setComputed(vm, computed) {
  Object.keys(computed).forEach(key => {
    const func = computed[key];
    Object.defineProperty(vm, key, {
      get() {
        return func.call(vm);
      }
    });
  });
}

export default class Miru {
  constructor({ data = {}, methods = {}, computed = {} } = {}) {
    setData(this, data);
    setMethod(this, methods);
    setComputed(this, computed);
  }

  $nextTick(func) {
    nextTick(func, this);
  }

  static $nextTick(func, context = null) {
    nextTick(func, context);
  }
}
