import _ from 'lodash';

const calcIndent = (depth, isCompared = false) => {
  const base = 4;
  const indent = isCompared ? (depth * base) - 2 : depth * base;
  return ' '.repeat(indent);
};

const formatNotCompared = (nested, depth) => {
  const keys = _.sortBy(Object.keys(nested));
  return keys.map((key) => {
    const space = calcIndent(depth);
    return _.isObject(nested[key])
      ? `${space}${key}: {\n${formatNotCompared(nested[key], depth + 1)}\n${space}}`
      : `${space}${key}: ${nested[key]}`;
  }).join('\n');
};

const styleChangedValue = (key, value, depth, symbol) => {
  const indentCompared = calcIndent(depth, true);
  return _.isObject(value)
    ? `${indentCompared}${symbol} ${key}: {\n${formatNotCompared(value, depth + 1)}\n${calcIndent(depth)}}`
    : `${indentCompared}${symbol} ${key}: ${value}`;
};

const stylish = (compared) => {
  const iter = (nested, depth) => {
    const keys = _.sortBy(Object.keys(nested));
    return keys.map((key) => {
      const { status, value } = nested[key];
      switch (status) {
        case 'unchanged': {
          return `${calcIndent(depth)}${key}: ${value}`;
        }
        case 'added': {
          return styleChangedValue(key, value, depth, '+');
        }
        case 'deleted': {
          return styleChangedValue(key, value, depth, '-');
        }
        case 'changed': {
          const { oldValue } = nested[key];
          const deleted = styleChangedValue(key, oldValue, depth, '-');
          const added = styleChangedValue(key, value, depth, '+');
          return `${deleted}\n${added}`;
        }
        default: {
          const space = calcIndent(depth);
          return `${space}${key}: {\n${iter(value, depth + 1, true)}\n${space}}`;
        }
      }
    }).join('\n');
  };
  const result = iter(compared, 1, true);
  return `{\n${result}\n}`;
};

export default stylish;
