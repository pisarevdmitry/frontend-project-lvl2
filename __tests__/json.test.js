import { test, expect } from '@jest/globals';
import path from 'path';
import { readFileSync } from 'fs';
import process from 'process';
import gendiff from '../src/index.js';

const getFixturePath = (filename) => path.join(process.cwd(), '__fixtures__', filename);

const getResult = (filename1, filename2, format = 'stylish') => {
  const filepath1 = getFixturePath(filename1);
  const filepath2 = getFixturePath(filename2);
  return gendiff(filepath1, filepath2, format);
};
test('shoult work1', () => {
  const result = getResult('file1.yaml', 'file2.json', 'json');
  const expected = readFileSync(getFixturePath('expected_json1.json'), 'utf-8');
  expect(result).toBe(expected);
});

test('shoult work2', () => {
  const result = getResult('file2.yml', 'file1.json', 'json');
  const expected = readFileSync(getFixturePath('expected_json2.json'), 'utf-8');
  expect(result).toBe(expected);
});
test('should work3', () => {
  const result = getResult('file1.yaml', 'empty_file1.json', 'json');
  const expected = readFileSync(getFixturePath('expected_json3.json'), 'utf-8');
  expect(result).toBe(expected);
});

test('should work4', () => {
  const result = getResult('empty_file1.yml', 'empty_file1.json', 'json');
  expect(result).toBe('{"type":"root","children":[]}');
});
