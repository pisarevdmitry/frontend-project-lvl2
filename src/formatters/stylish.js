import _ from 'lodash';

const calcIndent = (depth, isCompared = false) => {
  const baseIndent = 4;
  const comparedMargin = 2;
  const indent = isCompared ? (depth * baseIndent) - comparedMargin : depth * baseIndent;
  return ' '.repeat(indent);
};

const formatNotCompared = (obj, depth) => {
  const keys = _.sortBy(_.keys(obj));
  return keys.map((key) => {
    const space = calcIndent(depth);
    return _.isPlainObject(obj[key])
      ? `${space}${key}: {\n${formatNotCompared(obj[key], depth + 1)}\n${space}}`
      : `${space}${key}: ${obj[key]}`;
  }).join('\n');
};

const styleChangedValue = (key, value, depth, symbol) => {
  const indentCompared = calcIndent(depth, true);
  return _.isPlainObject(value)
    ? `${indentCompared}${symbol} ${key}: {\n${formatNotCompared(value, depth + 1)}\n${calcIndent(depth)}}`
    : `${indentCompared}${symbol} ${key}: ${value}`;
};

const buildFormat = (layer, depth) => {
  const result = layer.map((node) => {
    const { type, value, name } = node;
    switch (type) {
      case 'unchanged': {
        return `${calcIndent(depth)}${name}: ${value}`;
      }
      case 'added': {
        return styleChangedValue(name, value, depth, '+');
      }
      case 'deleted': {
        return styleChangedValue(name, value, depth, '-');
      }
      case 'changed': {
        const { oldValue, newValue } = node;
        const deleted = styleChangedValue(name, oldValue, depth, '-');
        const added = styleChangedValue(name, newValue, depth, '+');
        return `${deleted}\n${added}`;
      }
      case 'parent': {
        const space = calcIndent(depth);
        const { children } = node;
        return `${space}${name}: {\n${buildFormat(children, depth + 1)}\n${space}}`;
      }
      default:
        throw new Error(`unsupported ${type} type`);
    }
  }).join('\n');
  return result;
};

export default ({ children }) => {
  const result = buildFormat(children, 1);
  return `{\n${result}\n}`;
};
