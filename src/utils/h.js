import h from 'snabbdom/h';

function preprocess(props) {
  return Object.keys(props || {}).reduce(
    (acc, val) => {
      const array = val.split('-');
      if (array.length === 1) {
        acc.props[val] = props[val];
      } else {
        const [directive, type] = array;
        if (!Object.prototype.hasOwnProperty.call(acc, directive)) {
          acc[directive] = {};
        }
        acc[directive][type] = props[val];
      }

      return acc;
    },
    { props: {} },
  );
}

export default function newH(tagName, props, ...children) {
  const compiled = h(tagName, preprocess(props), children);
  return compiled;
}
