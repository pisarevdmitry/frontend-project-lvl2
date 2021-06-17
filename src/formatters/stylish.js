import _ from 'lodash';
import isComplex from '../utils.js';

const formatNotCompared = (nested, depth) => {
  const keys = _.sortBy(Object.keys(nested));
  return keys.map((key) => {
    const indent = depth * 4;
    const space = ' '.repeat(indent);
    return isComplex(nested[key])
      ? `${space}${key}: {\n${formatNotCompared(nested[key], depth + 1)}\n${space}}`
      : `${space}${key}: ${nested[key]}`;
  }).join('\n');
};

const styleChangedValue = (params) => {
  const {
    value, space, indent, depth, symbol, key,
  } = params;

  return isComplex(value)
    ? `${' '.repeat(indent - 2)}${symbol} ${key}: {\n${formatNotCompared(value, depth)}\n${space}}`
    : `${' '.repeat(indent - 2)}${symbol} ${key}: ${value}`;
};

const stylish = (compared) => {
  const iter = (nested, depth) => {
    const keys = _.sortBy(Object.keys(nested));
    return keys.map((key) => {
      const indent = depth * 4;
      const space = ' '.repeat(indent);
      const { status, value } = nested[key];
      switch (status) {
        case 'unchanged': {
          return `${space}${key}: ${value}`;
        }
        case 'added': {
          return styleChangedValue({
            indent, value, key, space, depth: depth + 1, symbol: '+',
          });
        }
        case 'deleted': {
          return styleChangedValue({
            indent, value, key, space, depth: depth + 1, symbol: '-',
          });
        }
        case 'changed': {
          const { from, to } = nested[key];
          const deleted = styleChangedValue({
            indent, value: from, key, space, depth: depth + 1, symbol: '-',
          });
          const added = styleChangedValue({
            indent, value: to, key, space, depth: depth + 1, symbol: '+',
          });
          return `${deleted}\n${added}`;
        }
        default:
          return `${space}${key}: {\n${iter(value, depth + 1, true)}\n${space}}`;
      }
    }).join('\n');
  };
  const result = iter(compared, 1, true);
  return `{\n${result}\n}`;
};

export default stylish;
