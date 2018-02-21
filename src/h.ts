import h from 'snabbdom/h';
import { VNode, VNodeData } from 'snabbdom/vnode';
import omit from 'lodash.omit';

function process(virtualdom: VNode) {

  virtualdom.data['style'] = virtualdom.data['style'] || {};

  let styleStr: string = '';

  if (virtualdom.data.attrs.style != null) {
    styleStr = virtualdom.data.attrs.style.toString();
  }

  const styles = styleStr
    .split(/\s*;\s*/).map(e => e.split(/\s*:\s*/));
  virtualdom.data.attrs = omit(virtualdom.data.attrs, ['style']);

  styles.forEach(([attr, value]) => {
    virtualdom.data['style'][attr] = value;
  });

  const attrs = virtualdom.data['attrs'];

  embedEvents(attrs, virtualdom);

  return virtualdom;
}

function embedEvents(attrs: Record<string, string | number | boolean>, virtualdom: VNode) {
  const events = Object.keys(attrs).filter(s => s.slice(0, 2) === 'on').reduce((acc, val) => {
    acc[val] = attrs[val];
    return acc;
  }, {});

  virtualdom.data['attrs'] = omit(virtualdom.data['attrs'], Object.keys(events));

  virtualdom.data['on'] = {};
  for (let key in events) {
    virtualdom.data['on'][key.slice(2)] = events[key];
  }
}

export function hyper(tagname, attr, ...children) {
  const attrs = ({ attrs: attr || {} } as VNodeData);
  return process(h(tagname, attrs, children));
}
