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

export default class Miru {
  constructor({ data }) {
    setData(this, data);
  }
}
