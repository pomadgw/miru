/// <reference path="index.d.ts" />
import { init } from 'snabbdom';
import snabprop from 'snabbdom/modules/props';
import snabattr from 'snabbdom/modules/attributes';
import snabevent from 'snabbdom/modules/eventlisteners';
import toVNode from "snabbdom/tovnode";
import { hyper, processComponent } from '../src/h';
import { _data, _ } from './data';

const patch = init([snabprop, snabattr, snabevent]);

class Miru implements Miru.IMiru {
  constructor(params: Miru.IMiruParameters) {
    _data.set(this, {});
    const { data, watch, methods, computed, render, components, props } = params;

    _(this).components = components;

    if (methods != null) {
      this.setMethods(methods);
    }

    if (computed != null) {
      this.setComputed(computed);
    }

    if (render != null) {
      _(this).render = render.bind(this);
    }

    if (props != null) {
      _(this).propsParams = props;
      this.setupProps(props);
    }

    if (data) {
      if (data instanceof Function) {
        this.setData(data(), watch);
      } else {
        this.setData(data, watch);
      }
    }
  }

  private setMethods(methods) {
    for (let key of Object.keys(methods)) {
      this[key] = methods[key].bind(this);
    }
  }

  $mount(selector) {
    _(this).tree = document.querySelector(selector);
    _(this).vnode = null;
    this.doPatch();
  }

  static h(tagname, props, ...children) {
    return hyper(tagname, props, ...children);
  }

  setProps(props) {
    Object.keys(props).forEach((key) => {
      this[key] = props[key];
    });
  }

  private doPatch() {
    if (_(this).render != null) {
      const vnode = _(this).render();
      processComponent(vnode, _(this).components);
      if (_(this).vnode === null) {
        patch(_(this).tree, vnode);
        _(this).vnode = vnode;
      } else {
        patch(_(this).vnode, vnode);
      }
      // _(this).vnode = vnode;
    }

    return _(this).tree;
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

  private setupProps(props) {
    _(this).props = {};
    // _(this).watch = _(this).watch || {};

    // if (watch != null) {
    //   for(let key of Object.keys(watch)) {
    //     _(this).watch[key] = watch[key].bind(this);
    //   }
    // }

    for (let key of Object.keys(props)) {
      Object.defineProperty(this, key, {
        get() {
          return _(this).props[key];
        },
        set(value) {
          _(this).props[key] = value;

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
