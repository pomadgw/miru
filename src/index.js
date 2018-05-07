// @flow

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

let tickFunctions = [];
let tickIsRunning = false;

setInterval(() => {
  tickIsRunning = true;
  tickFunctions.forEach(e => e());

  tickFunctions = [];
  tickIsRunning = false;
}, 25);

async function addTickFunc(func) {
  for (;;) {
    if (!tickIsRunning) {
      tickFunctions.push(func);
      break;
    }
  }
}

export default class Miru {
  constructor({ data = {}, methods = {} } = {}) {
    setData(this, data);
    setMethod(this, methods);
  }

  static $nextTick(func) {
    addTickFunc(func);
  }
}
