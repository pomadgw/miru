import { init } from 'snabbdom';
import sProps from 'snabbdom/modules/props';
import sClass from 'snabbdom/modules/class';
import sEvent from 'snabbdom/modules/eventlisteners';
import h from 'snabbdom/h';

import { $p } from './data';

const patch = init([sProps, sClass, sEvent]);

function mount(vm, selector) {
  $p(vm).tree = document.querySelector(selector);

  const vdom = $p(vm).render(h);

  patch($p(vm).tree, vdom);
}

function doPatch() {

}

export { mount, doPatch };