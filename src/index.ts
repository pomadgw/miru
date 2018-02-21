/// <reference path="index.d.ts" />
import { init } from 'snabbdom';
import snabprop from 'snabbdom/modules/props';
import snabattr from 'snabbdom/modules/attributes';
import snabevent from 'snabbdom/modules/eventlisteners';
import { hyper } from '../src/h';

const patch = init([snabprop, snabattr, snabevent]);

const _data = new WeakMap();
function _(key: object) : any {
  return _data.get(key);
}

class Miru implements Miru.IMiru {
  constructor(params: Miru.IMiruParameters) {
    _data.set(this, {});
    const { data, watch, methods, computed, render } = params;

    if (methods != null) {
      this.setMethods(methods);
    }

    if (computed != null) {
      this.setComputed(computed);
    }

    if (render != null) {
      _(this).render = render.bind(this);
    }

    if (data instanceof Function) {
      this.setData(data(), watch);
    } else {
      this.setData(data, watch);
    }
  }

  private setMethods(methods) {
    for (let key of Object.keys(methods)) {
      this[key] = methods[key].bind(this);
    }
  }

  $mount(selector) {
    _(this).tree = document.querySelector(selector);
    this.doPatch();
  }

  static h(tagname, props, ...children) {
    return hyper(tagname, props, ...children);
  }

  private doPatch() {
    if (_(this).render != null) {
      const vnode = _(this).render();
      patch(_(this).tree, vnode);
      _(this).tree = vnode;
    }
  }

  private setData(data, watch) {
    _(this).data = data;
    _(this).watch = {};

    if (watch != null) {
      for(let key of Object.keys(watch)) {
        _(this).watch[key] = watch[key].bind(this);
      }
    }

    for (let key of Object.keys(data)) {
      Object.defineProperty(this, key, {
        get() {
          return _(this).data[key];
        },
        set(value) {
          _(this).data[key] = value;

          if (_(this).watch[key] != null) {
            _(this).watch[key](value);
          }

          this.doPatch();
        }
      })
    }
  }

  private setComputed(computed) {
    _(this).computedFunctions = {};
    for (let key of Object.keys(computed)) {
      _(this).computedFunctions[key] = computed[key].bind(this);

      Object.defineProperty(this, key, {
        get() {
          return _(this).computedFunctions[key]();
        }
      })
    }
  }
}

export default Miru;
