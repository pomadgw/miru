import { init } from 'snabbdom';
import sProps from 'snabbdom/modules/props';
import sClass from 'snabbdom/modules/class';
import sEvent from 'snabbdom/modules/eventlisteners';
import h from '../utils/h';
import { $p } from './data';

import Miru from '../index';

const patch = init([sProps, sClass, sEvent]);

function transformComponent(vdom, components) {
  const newVdom = Object.assign({}, vdom);

  const compTagNames = Object.keys(components).map((e) => {
    if (components[e].name) return components[e].name;
    return e;
  });

  const listOfComponents = Object.keys(components).reduce((acc, v) => {
    if (components[v].name) {
      acc[components[v].name] = components[v];
    } else {
      acc[v] = components[v];
    }

    return acc;
  }, {});

  if (compTagNames.includes(newVdom.sel)) {
    const component = new Miru(listOfComponents[newVdom.sel]);
    return $p(component).render(h);
  }

  if (newVdom.children) {
    newVdom.children = newVdom.children.map(child =>
      transformComponent(child, components));
  }

  return newVdom;
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
