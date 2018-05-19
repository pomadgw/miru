import h from 'snabbdom/h';

function preprocess(props) {
  return Object.keys(props || {}).reduce(
    (acc, val) => {
      const array = val.split('-');
      if (array.length === 1) {
        if (val === 'class') {
          acc.class = acc.class !== undefined ? acc.class : {};
          acc.class[props[val]] = true;
        } else if (val === 'style') {
          const styles = props[val]
            .split(/\s*;\s*/)
            .map(style => style.split(/\s*:\s*/))
            .reduce((accu, styleArray) => {
              const [attr, value] = styleArray;
              accu[attr] = value; // eslint-disable-line no-param-reassign
              return accu;
            }, {});
          acc.style = styles;
        } else {
          acc.props[val] = props[val];
        }
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
