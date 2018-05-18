// @flow
import nextTick from './utils/tick';
import { $p, $pInit } from './utils/data';
import { mount } from './utils/vdom';
import {
  setData,
  setComputed,
  setMethod,
  setWatcher,
  setProps,
} from './setters';
import setComponents from './setters/components';

function noop() {}

export default class Miru {
  constructor({
    data = {},
    methods = {},
    computed = {},
    watch = {},
    render = noop,
    components = {},
    props = [],
  } = {}) {
    $pInit(this);

    setData(this, data);
    setProps(this, props);
    setMethod(this, methods);
    setComputed(this, computed);
    setWatcher(this, watch);

    setComponents(this, components);

    $p(this).render = render.bind(this);
  }

  $mount(selector) {
    mount(this, selector);
  }

  $nextTick(func) {
    nextTick(func, this);
  }

  static $nextTick(func, context = null) {
    nextTick(func, context);
  }
}
