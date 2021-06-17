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
          return isComplex(value)
            ? `${' '.repeat(indent - 2)}+ ${key}: {\n${formatNotCompared(value, depth + 1)}\n${space}}`
            : `${' '.repeat(indent - 2)}+ ${key}: ${value}`;
        }
        case 'deleted': {
          return isComplex(value)
            ? `${' '.repeat(indent - 2)}- ${key}: {\n${formatNotCompared(value, depth + 1)}\n${space}}`
            : `${' '.repeat(indent - 2)}- ${key}: ${value}`;
        }
        case 'changed': {
          const { from, to } = nested[key];
          const added = isComplex(from)
            ? `${' '.repeat(indent - 2)}- ${key}: {\n${formatNotCompared(from, depth + 1)}\n${space}}`
            : `${' '.repeat(indent - 2)}- ${key}: ${from}`;
          const deleted = isComplex(to)
            ? `${' '.repeat(indent - 2)}+ ${key}: {\n${formatNotCompared(to, depth + 1)}\n${space}}`
            : `${' '.repeat(indent - 2)}+ ${key}: ${to}`;
          return `${added}\n${deleted}`;
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
