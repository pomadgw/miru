import { $p } from '../utils/data';
import Dependency from '../utils/dep';
import { doPatch } from '../utils/vdom';

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

export function setData(vm, data) {
  const isFunc = typeof data === 'function';
  const $data = isFunc ? data() : data;
  // $p(vm).deps = {};

  Object.keys($data).forEach((key) => {
    let deps = [];

    observe(vm, key, () => {
      doPatch(vm);
    });

    Object.defineProperty(vm, key, {
      get() {
        if (Dependency.target) {
          Dependency.depend(deps, key);
        }
        return $data[key];
      },
      set(value) {
        $data[key] = value;
        deps = Dependency.getValidDeps(deps, key);
        Dependency.notifyDeps(deps, e => notify(vm, e, value));

        notify(vm, key, value);
      },
    });

    // $p(vm).deps[key] = deps;
  });
}

export function setMethod(vm, methods) {
  const vmTmp = vm;
  Object.keys(methods).forEach((key) => {
    vmTmp[key] = methods[key].bind(vm);
  });
}

export function setComputed(vm, computed) {
  $p(vm).computedCaches = {};

  Object.keys(computed).forEach((key) => {
    let deps = [];
    $p(vm).computedCaches[key] = null;

    observe(vm, key, () => {
      $p(vm).computedCaches[key] = null;
      deps = Dependency.getValidDeps(deps, key);
      Dependency.notifyDeps(deps, e => notify(vm, e));
      doPatch(vm);
    });

    const func = computed[key];
    Object.defineProperty(vm, key, {
      get() {
        if (Dependency.target) {
          Dependency.depend(deps, key);
        }

        Dependency.target = key;

        if ($p(vm).computedCaches[key] === null) {
          Dependency.subs[key] = [];
          $p(vm).computedCaches[key] = func.call(vm);
        }

        const value = $p(vm).computedCaches[key];

        Dependency.target = null;

        return value;
      },
      set() {},
    });
  });
}

export function setWatcher(vm, watcher) {
  Object.keys(watcher).forEach((key) => {
    const func = watcher[key];
    observe(vm, key, (value) => {
      func.call(vm, value);
    });
  });
}

export function setProps(vm, props) {
  $p(vm).props = props;
  props.forEach((key) => {
    let deps = [];
    let propValue = null;

    // observe(vm, key, () => {
    //   doPatch(vm);
    // });

    Object.defineProperty(vm, key, {
      get() {
        if (Dependency.target) {
          Dependency.depend(deps, key);
        }
        return propValue;
      },
      set(value) {
        propValue = value;
        deps = Dependency.getValidDeps(deps, key);
        Dependency.notifyDeps(deps, e => notify(vm, e, value));

        notify(vm, key, value);
      },
    });
  });
}
