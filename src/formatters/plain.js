import _ from 'lodash';

const formatValue = (value) => {
  if (_.isPlainObject(value)) return '[complex value]';
  if (typeof (value) === 'string') return `'${value}'`;
  return value;
};

const buildFormat = (children, path) => {
  const result = children.map((node) => {
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
        const { children: nodeChildren } = node;
        return buildFormat(nodeChildren, `${path}${name}.`);
      }
      default:
        throw new Error(`unsupported ${type} type`);
    }
  });
  return result.filter((elem) => elem !== null).join('\n');
};

export default ({ children }) => buildFormat(children, '');
