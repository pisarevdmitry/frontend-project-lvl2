import _ from 'lodash';

const isComplex = (value) => value && typeof (value) === 'object';
const cloneValue = (value) => (isComplex(value) ? _.cloneDeep(value) : value);

const compare = (obj1, obj2) => {
  const mergedKeys = Object.keys({ ...obj1, ...obj2 });
  const result = mergedKeys.reduce((acc, key) => {
    let elem;
    if (!_.has(obj1, key)) {
      elem = {
        status: 'added',
        value: cloneValue(obj2[key]),
      };
    } else if (!_.has(obj2, key)) {
      elem = {
        status: 'deleted',
        value: cloneValue(obj1[key]),
      };
    } else if (isComplex(obj1[key]) && isComplex(obj2[key])) {
      elem = {
        value: compare(obj1[key], obj2[key]),
      };
    } else if (obj1[key] !== obj2[key]) {
      elem = {
        status: 'changed',
        from: obj1[key],
        to: obj2[key],
      };
    } else {
      elem = {
        status: 'unchanged',
        value: obj1[key],
      };
    }
    return { ...acc, [key]: elem };
  }, {});
  return result;
};

export default compare;
