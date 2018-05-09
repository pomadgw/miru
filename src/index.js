// @flow
import nextTick from './utils/tick';
import { $p, $pInit } from './utils/data';
import { setData, setComputed, setMethod, setWatcher } from './setters';

export default class Miru {
  constructor({
    data = {}, methods = {}, computed = {}, watch = {},
  } = {}) {
    $pInit(this);

    setData(this, data);
    setMethod(this, methods);
    setComputed(this, computed);
    setWatcher(this, watch);

    $p(this).events = {};
  }

  $nextTick(func) {
    nextTick(func, this);
  }

  $on(name, func) {
    $p(this).events[name] = $p(this).events[name] || [];
    $p(this).events[name].push(func.bind(this));
  }

  $emit(name, ...args) {
    if ($p(this).events[name]) {
      $p(this).events[name].forEach(func => func(...args));
    }
  }

  static $nextTick(func, context = null) {
    nextTick(func, context);
  }
}
