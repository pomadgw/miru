// @flow
import nextTick from './utils/tick';
import { $pInit } from './utils/data';
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
  }

  $nextTick(func) {
    nextTick(func, this);
  }

  static $nextTick(func, context = null) {
    nextTick(func, context);
  }
}
