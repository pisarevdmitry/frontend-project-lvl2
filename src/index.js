import process from 'process';
import path from 'path';
import { readFileSync } from 'fs';
import parseFile from './parsers.js';
import compare from './compare.js';
import format from './formatters/index.js';

const gendiff = (filepath1, filepath2, outputFormat = 'stylish') => {
  const pathToFile1 = path.resolve(process.cwd(), filepath1);
  const pathToFile2 = path.resolve(process.cwd(), filepath2);
  const file1 = readFileSync(pathToFile1, 'utf-8');
  const file2 = readFileSync(pathToFile2, 'utf-8');
  const data1 = parseFile(file1, path.extname(pathToFile1).slice(1));
  const data2 = parseFile(file2, path.extname(pathToFile2).slice(1));
  const compared = compare(data1, data2);
  console.log('output', outputFormat, compared);
  const result = format(compared, outputFormat);
  return result;
};

export default gendiff;
