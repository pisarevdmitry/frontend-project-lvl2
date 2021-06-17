import _ from 'lodash';
import isComplex from '../utils.js';

const returnValue = (value) => {
  if (isComplex(value)) return '[complex value]';
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
          return `Property '${path}${key}' was added with value: ${returnValue(value)}`;
        }
        case 'deleted': {
          return `Property '${path}${key}' was removed`;
        }
        case 'changed': {
          const { from, to } = nested[key];
          return `Property '${path}${key}' was updated. From ${returnValue(from)} to ${returnValue(to)}`;
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
