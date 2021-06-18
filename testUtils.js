import path from 'path';
import process from 'process';
import gendiff from './src/index.js';

export const getFixturePath = (filename) => path.join(process.cwd(), '__fixtures__', filename);
export const getResult = (filename1, filename2, format = 'stylish') => {
  const filepath1 = getFixturePath(filename1);
  const filepath2 = getFixturePath(filename2);
  return gendiff(filepath1, filepath2, format);
};
