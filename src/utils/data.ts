const _data = new WeakMap();

function $p(key: object): any {
  return _data.get(key);
}

function $pInit(key: object): void {
  _data.set(key, {});
}

export { _data, $p, $pInit };
