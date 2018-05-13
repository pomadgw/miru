import { init } from 'snabbdom';
import sProps from 'snabbdom/modules/props';
import sClass from 'snabbdom/modules/class';
import sEvent from 'snabbdom/modules/eventlisteners';
import h from '../utils/h';

import { $p } from './data';

const patch = init([sProps, sClass, sEvent]);

function transformComponent(vdom, components) {
  const compTagNames = Object.keys(components).map((e) => {
    if (components.name) return components.name;
    return e;
  });

  const listOfComponents = Object.keys(components).reduce((acc, v) => {
    if (components.name) {
      acc[components.name] = components[v];
    } else {
      acc[v] = components[v];
    }

    return acc;
  }, {});

  if (compTagNames.includes(vdom.sel)) {
    const component = listOfComponents[vdom.sel];
    return $p(component).render(h);
  }

  return vdom;
}

function doPatch(vm) {
  let vdom = $p(vm).render(h);
  if (!vdom) return;

  vdom = transformComponent(vdom, $p(vm).components);

  patch($p(vm).tree, vdom);
}

function mount(vm, selector) {
  let vdom = $p(vm).render(h);
  if (!vdom) return;

  vdom = transformComponent(vdom, $p(vm).components);

  patch(document.querySelector(selector), vdom);
  $p(vm).tree = vdom;
}

export { mount, doPatch };
