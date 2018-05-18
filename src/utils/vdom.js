import { init } from 'snabbdom';
import sProps from 'snabbdom/modules/props';
import sClass from 'snabbdom/modules/class';
import sEvent from 'snabbdom/modules/eventlisteners';
import h from '../utils/h';
import { $p } from './data';

import Miru from '../index';

const patch = init([sProps, sClass, sEvent]);

function transformComponent(vdom, components, parent = null) {
  const newVdom = Object.assign({}, vdom);
  const { props } = vdom.data || { props: {} };

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
    const componentObj = listOfComponents[newVdom.sel];
    const isMiruObj = componentObj.constructor.name === 'Miru';
    const component = isMiruObj ? componentObj : new Miru({ ...componentObj });
    Object.keys(props).forEach((key) => {
      if (Object.prototype.hasOwnProperty.call(component, key)) {
        component[key] = props[key];
      }
    });

    $p(component).parent = parent;
    return $p(component).render(h);
  }

  if (newVdom.children) {
    newVdom.children = newVdom.children.map(child =>
      transformComponent(child, components, parent));
  }

  return newVdom;
}

function doPatch(vm) {
  if ($p(vm).parent) {
    doPatch($p(vm).parent);
    return;
  }
  let vdom = $p(vm).render(h);
  if (!vdom) return;

  vdom = transformComponent(vdom, $p(vm).components, vm);

  patch($p(vm).tree, vdom);
}

function mount(vm, selector) {
  let vdom = $p(vm).render(h);
  if (!vdom) return;

  vdom = transformComponent(vdom, $p(vm).components, vm);

  patch(document.querySelector(selector), vdom);
  $p(vm).tree = vdom;
}

export { mount, doPatch };
