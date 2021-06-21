import _ from 'lodash';

const formatReturnValue = (value) => {
  if (_.isObject(value)) return '[complex value]';
  if (typeof (value) === 'string') return `'${value}'`;
  return value;
};

const iterateTree = (layer, path) => {
  const result = layer.map((node) => {
    const { type, value, name } = node;
    switch (type) {
      case 'added': {
        return `Property '${path}${name}' was added with value: ${formatReturnValue(value)}`;
      }
      case 'deleted': {
        return `Property '${path}${name}' was removed`;
      }
      case 'changed': {
        const { oldValue, newValue } = node;
        return `Property '${path}${name}' was updated. From ${formatReturnValue(oldValue)} to ${formatReturnValue(newValue)}`;
      }
      case 'unchanged': {
        return null;
      }
      case 'not compared': {
        const { children } = node;
        return iterateTree(children, `${path}${name}.`);
      }
      default:
        return null;
    }
  });
  return result.filter((elem) => elem !== null).join('\n');
};

const plain = ({ children }) => iterateTree(children, '');

export default plain;
