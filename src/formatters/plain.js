import _ from 'lodash';

const formatReturnValue = (value) => {
  if (_.isObject(value)) return '[complex value]';
  if (typeof (value) === 'string') return `'${value}'`;
  return value;
};

const plain = (compared) => {
  const iter = (nested, path) => {
    const keys = _.sortBy(Object.keys(nested));
    const test = keys.map((key) => {
      const { status, value } = nested[key];
      switch (status) {
        case 'added': {
          return `Property '${path}${key}' was added with value: ${formatReturnValue(value)}`;
        }
        case 'deleted': {
          return `Property '${path}${key}' was removed`;
        }
        case 'changed': {
          const { from, to } = nested[key];
          return `Property '${path}${key}' was updated. From ${formatReturnValue(from)} to ${formatReturnValue(to)}`;
        }
        case 'unchanged': {
          return null;
        }
        default:
          return iter(value, `${path}${key}.`);
      }
    });
    return test.filter((elem) => elem !== null).join('\n');
  };
  return iter(compared, '');
};

export default plain;
