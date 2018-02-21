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

  return virtualdom;
}

export function hyper(tagname, attr, ...children) {
  const attrs = ({ attrs: attr } as VNodeData);
  return process(h(tagname, attrs, children));
}
