/// <reference path="index.d.ts" />

const _data = new WeakMap();
function _(key: object) : any {
  return _data.get(key);
}

class Miru implements Miru.IMiru {
  constructor(params: Miru.IMiruParameters) {
    _data.set(this, {});
    const { data } = params;

    if (data instanceof Function) {
      this.setData(data());
    } else {
      this.setData(data);
    }
  }

  private setData(data) {
    _(this).data = data;

    for (let key of Object.keys(data)) {
      Object.defineProperty(this, key, {
        get() {
          return _(this).data[key];
        },
        set(value) {
          _(this).data[key] = value;
        }
      })
    }
  }
}

export default Miru;
