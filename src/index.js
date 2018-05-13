// @flow
import nextTick from './utils/tick';
import { $p, $pInit } from './utils/data';
import { mount } from './utils/vdom';
import { setData, setComputed, setMethod, setWatcher } from './setters';

function noop() {}

export default class Miru {
  constructor({
    data = {},
    methods = {},
    computed = {},
    watch = {},
    render = noop,
  } = {}) {
    $pInit(this);

    setData(this, data);
    setMethod(this, methods);
    setComputed(this, computed);
    setWatcher(this, watch);

    $p(this).events = {};
    $p(this).render = render.bind(this);
  }

  $mount(selector) {
    mount(this, selector);
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
