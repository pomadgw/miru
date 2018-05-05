function setData(vm, data) {
  const isFunc = typeof data === 'function';
  const $data = isFunc ? data() : data;

  Object.keys($data).forEach((key) => {
    Object.defineProperty(vm, key, {
      get() {
        return $data[key];
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

export default class Miru {
  constructor({ data = {}, methods = {} } = {}) {
    setData(this, data);
    setMethod(this, methods);
  }
}
