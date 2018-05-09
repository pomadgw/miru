// @flow
import nextTick from './utils/tick';
import { $p, $pInit } from './utils/data';
import Dependency from './utils/dep';


function observe(context, key, func) {
  if ($p(context).subscribe == null) {
    $p(context).subscribe = {};
  }

  if ($p(context).subscribe[key] == null) {
    $p(context).subscribe[key] = [];
  }

  $p(context).subscribe[key].push(func);
}

function notify(context, key, value = null) {
  if ($p(context).subscribe && $p(context).subscribe[key]) {
    $p(context).subscribe[key].forEach(func => func(value));
  }
}

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
        deps.notify(e => notify(vm, e, value));

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

  Object.keys(computed).forEach((key) => {
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
      set() { },
    });
  });
}

function setWatcher(vm, watcher) {
  Object.keys(watcher).forEach((key) => {
    const func = watcher[key];
    observe(vm, key, (value) => {
      func.call(vm, value);
    });
  });
}

export default class Miru {
  constructor({ data = {}, methods = {}, computed = {}, watch = {} } = {}) {
    $pInit(this);

    setData(this, data);
    setMethod(this, methods);
    setComputed(this, computed);
    setWatcher(this, watch);
  }

  $nextTick(func) {
    nextTick(func, this);
  }

  static $nextTick(func, context = null) {
    nextTick(func, context);
  }
}
