import _ from 'lodash';
import isComplex from './utils.js';

const cloneValue = (value) => (isComplex(value) ? _.cloneDeep(value) : value);

const compare = (obj1, obj2) => {
  const mergedKeys = Object.keys({ ...obj1, ...obj2 });
  const result = mergedKeys.reduce((acc, key) => {
    if (!_.has(obj1, key)) {
      const elem = {
        status: 'added',
        value: cloneValue(obj2[key]),
      };
      return { ...acc, [key]: elem };
    }
    if (!_.has(obj2, key)) {
      const elem = {
        status: 'deleted',
        value: cloneValue(obj1[key]),
      };
      return { ...acc, [key]: elem };
    }
    if (isComplex(obj1[key]) && isComplex(obj2[key])) {
      const elem = {
        value: compare(obj1[key], obj2[key]),
      };
      return { ...acc, [key]: elem };
    }
    if (obj1[key] !== obj2[key]) {
      const elem = {
        status: 'changed',
        from: obj1[key],
        to: obj2[key],
      };
      return { ...acc, [key]: elem };
    }
    const elem = {
      status: 'unchanged',
      value: obj1[key],
    };
    return { ...acc, [key]: elem };
  }, {});
  return result;
};

export default compare;
