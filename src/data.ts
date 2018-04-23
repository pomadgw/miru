const _data = new WeakMap();

function _(key: object): any {
  return _data.get(key);
}

export {
  _data,
  _,
};
