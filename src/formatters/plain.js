import _ from 'lodash';

const formatValue = (value) => {
  if (_.isPlainObject(value)) return '[complex value]';
  if (typeof (value) === 'string') return `'${value}'`;
  return value;
};

const iterateTree = (layer, path) => {
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
      case 'continue compare': {
        const { children } = node;
        return iterateTree(children, `${path}${name}.`);
      }
      default:
        return null;
    }
  });
  return result.filter((elem) => elem !== null).join('\n');
};

const formatPlain = ({ children }) => iterateTree(children, '');

export default formatPlain;
