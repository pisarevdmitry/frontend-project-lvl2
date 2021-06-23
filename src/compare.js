import _ from 'lodash';

const buildDiffTree = (data1, data2) => {
  const mergedKeys = _.union(_.keys(data1), _.keys(data2));
  const sortedKeys = _.sortBy(mergedKeys);
  const result = sortedKeys.map((key) => {
    if (!_.has(data1, key)) {
      return {
        name: key,
        type: 'added',
        value: data2[key],
      };
    }
    if (!_.has(data2, key)) {
      return {
        name: key,
        type: 'deleted',
        value: data1[key],
      };
    }
    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      return {
        name: key,
        type: 'parent',
        children: buildDiffTree(data1[key], data2[key]),
      };
    }
    if (data1[key] !== data2[key]) {
      return {
        name: key,
        type: 'changed',
        oldValue: data1[key],
        newValue: data2[key],
      };
    }
    return {
      name: key,
      type: 'unchanged',
      value: data1[key],
    };
  });
  return result;
};

const compare = (data1, data2) => (
  {
    type: 'root',
    children: buildDiffTree(data1, data2),
  }
);

export default compare;
