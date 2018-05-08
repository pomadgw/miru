// @flow
import nextTick from './utils/tick';
import { $p, $pInit } from './utils/data';
import Dependency from './utils/dep';

const dep = {
  target: null,
};

function setData(vm, data) {
  const isFunc = typeof data === 'function';
  const $data = isFunc ? data() : data;
  $p(vm).deps = {};

  Object.keys($data).forEach((key) => {
    const deps = new Dependency();

    Object.defineProperty(vm, key, {
      get() {
        if (Dependency.hasTarget()) {
          deps.depend(key);
        }
        return $data[key];
      },
      set(value) {
        $data[key] = value;
        deps.clearUpDeps(key);
        deps.notify((e) => notify(vm, e, value));

        notify(vm, key, value);
      },
    });

    $p(vm).deps[key] = deps;
  });
}

function setMethod(vm, methods) {
  const vmTmp = vm;
  Object.keys(methods).forEach((key) => {
    vmTmp[key] = methods[key].bind(vm);
  });
}

function setComputed(vm, computed) {
  $p(vm).computedCaches = {};

  Object.keys(computed).forEach(key => {
    const deps = new Dependency();
    $p(vm).computedCaches[key] = null;

    observe(vm, key, () => {
      $p(vm).computedCaches[key] = null;
      deps.clearUpDeps(key);
      deps.notify(e => notify(vm, e));
    });

    const func = computed[key];
    Object.defineProperty(vm, key, {
      get() {
        if (Dependency.hasTarget()) {
          deps.depend(key);
        }

        Dependency.target = key;

        if ($p(vm).computedCaches[key] === null) {
          deps.createEmptySubscribes(key);
          $p(vm).computedCaches[key] = func.call(vm);
        }

        const value = $p(vm).computedCaches[key];

        Dependency.target = null;

        return value;
      },
      set() { }
    });
  });
}

function observe(context, key, func) {
  if (context._subscribe == null) {
    context._subscribe = {};
  }

  if (context._subscribe[key] == null) {
    context._subscribe[key] = [];
  }

  context._subscribe[key].push(func);
}

function notify(context, key, value = null) {
  if (context._subscribe && context._subscribe[key]) {
    context._subscribe[key].forEach((func) => func(value));
  }
}

export default class Miru {
  constructor({ data = {}, methods = {}, computed = {} } = {}) {
    $pInit(this);

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
