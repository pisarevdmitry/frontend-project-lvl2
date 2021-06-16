import _ from 'lodash';

const isComplex = (value) => value && typeof (value) === 'object';

const stylish = (compared) => {
  const iter = (nested, depth, isCompared) => {
    const keys = _.sortBy(Object.keys(nested));
    return keys.map((key) => {
      let space;
      const indent = depth * 4;
      if (!isCompared) {
        space = ' '.repeat(indent);
        return isComplex(nested[key])
          ? `${space}${key}: {\n${iter(nested[key], depth + 1, isCompared)}\n${space}}`
          : `${space}${key}: ${nested[key]}`;
      }
      const { status, value } = nested[key];
      switch (status) {
        case 'unchanged': {
          space = ' '.repeat(indent);
          return `${space}${key}: ${value}`;
        }
        case 'added': {
          space = ' '.repeat(indent);
          return isComplex(value)
            ? `${' '.repeat(indent - 2)}+ ${key}: {\n${iter(value, depth + 1, false)}\n${space}}`
            : `${' '.repeat(indent - 2)}+ ${key}: ${value}`;
        }
        case 'deleted': {
          space = ' '.repeat(indent);
          return isComplex(value)
            ? `${' '.repeat(indent - 2)}- ${key}: {\n${iter(value, depth + 1, false)}\n${space}}`
            : `${' '.repeat(indent - 2)}- ${key}: ${value}`;
        }
        case 'changed': {
          const { from, to } = nested[key];
          space = ' '.repeat(indent);
          const added = isComplex(from)
            ? `${' '.repeat(indent - 2)}- ${key}: {\n${iter(from, depth + 1, false)}\n${space}}`
            : `${' '.repeat(indent - 2)}- ${key}: ${from}`;
          const deleted = isComplex(to)
            ? `${' '.repeat(indent - 2)}+ ${key}: {\n${iter(to, depth + 1, false)}\n${space}}`
            : `${' '.repeat(indent - 2)}+ ${key}: ${to}`;
          return `${added}\n${deleted}`;
        }
        default:
          space = ' '.repeat(indent);
          return `${space}${key}: {\n${iter(value, depth + 1, true)}\n${space}}`;
      }
    }).join('\n');
  };
  const result = iter(compared, 1, true);
  return `{\n${result}\n}`;
};

export default stylish;
