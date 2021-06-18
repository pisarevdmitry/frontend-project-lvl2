import _ from 'lodash';

const cloneValue = (value) => (_.isObject(value) ? _.cloneDeep(value) : value);

const createElem = (status, value, oldValue = null) => ({
  status,
  value,
  oldValue,
});

const compare = (obj1, obj2) => {
  const mergedKeys = Object.keys({ ...obj1, ...obj2 });
  const result = mergedKeys.reduce((acc, key) => {
    if (!_.has(obj1, key)) {
      return { ...acc, [key]: createElem('added', cloneValue(obj2[key])) };
    }
    if (!_.has(obj2, key)) {
      return { ...acc, [key]: createElem('deleted', cloneValue(obj1[key])) };
    }
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      return { ...acc, [key]: createElem(null, compare(obj1[key], obj2[key])) };
    }
    if (obj1[key] !== obj2[key]) {
      return { ...acc, [key]: createElem('changed', obj2[key], obj1[key]) };
    }
    return { ...acc, [key]: createElem('unchanged', obj1[key]) };
  }, {});
  return result;
};

export default compare;
