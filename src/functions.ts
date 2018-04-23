import h from 'snabbdom/h';

export function mIf(cond, conseq, alt = null) {
  if (cond) {
    return conseq;
  } else if (alt == null) {
    return h('!');
  } else {
    return alt;
  }
}
