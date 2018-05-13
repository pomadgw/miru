import h from 'snabbdom/h';

export default function newH(tagName, props, children) {
  const compiled = h(tagName, { props }, children);
  return compiled;
}
