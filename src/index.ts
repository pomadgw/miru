/// <reference path="index.d.ts" />

const _data = new WeakMap();
function _(key: object) : any {
  return _data.get(key);
}

class Miru implements Miru.IMiru {
  constructor(params: Miru.IMiruParameters) {
    _data.set(this, {});
    const { data, watch, methods } = params;

    if (methods != null) {
      this.setMethods(methods);
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
        }
      })
    }
  }
}

export default Miru;
