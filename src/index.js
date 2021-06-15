import process from 'process';
import path from 'path';
import { readFileSync } from 'fs';
import _ from 'lodash';

const gendiff = (filepath1, filepath2) => {
  console.log('filepath1:', filepath1);
  console.log('filepath2:', filepath2);
  const file1 = readFileSync(path.resolve(process.cwd(), filepath1));
  const file2 = readFileSync(path.resolve(process.cwd(), filepath2));
  const data1 = JSON.parse(file1);
  const data2 = JSON.parse(file2);
  const mergedKeys = _.sortBy(Object.keys({ ...data1, ...data2 }));
  const stringedData = mergedKeys.map((key) => {
    if (!_.has(data1, key)) return `  + ${key}: ${data2[key]}`;
    if (!_.has(data2, key)) return `  - ${key}: ${data1[key]}`;
    if (data1[key] !== data2[key]) {
      return `  - ${key}: ${data1[key]}\n  + ${key}: ${data2[key]}`;
    }
    return `    ${key}: ${data1[key]}`;
  });
  return `{\n${stringedData.join('\n')}\n}`;
};

export default gendiff;
