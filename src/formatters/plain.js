import _ from 'lodash';

const formatValue = (value) => {
  if (_.isPlainObject(value)) return '[complex value]';
  if (typeof (value) === 'string') return `'${value}'`;
  return value;
};

const buildFormat = (layer, path) => {
  const result = layer.map((node) => {
    const { type, value, name } = node;
    switch (type) {
      case 'added': {
        return `Property '${path}${name}' was added with value: ${formatValue(value)}`;
      }
      case 'deleted': {
        return `Property '${path}${name}' was removed`;
      }
      case 'changed': {
        const { oldValue, newValue } = node;
        return `Property '${path}${name}' was updated. From ${formatValue(oldValue)} to ${formatValue(newValue)}`;
      }
      case 'unchanged': {
        return null;
      }
      case 'parent': {
        const { children } = node;
        return buildFormat(children, `${path}${name}.`);
      }
      default:
        throw new Error(`unsupported ${type} type`);
    }
  });
  return result.filter((elem) => elem !== null).join('\n');
};

export default ({ children }) => buildFormat(children, '');
