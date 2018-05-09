const $data = new WeakMap();

function $p(key) {
  return $data.get(key);
}

function $pInit(key) {
  $data.set(key, {});
}

export { $data, $p, $pInit };
