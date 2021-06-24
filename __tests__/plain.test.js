import { test, expect } from '@jest/globals';
import path from 'path';
import process from 'process';
import { readFileSync } from 'fs';
import gendiff from '../src/index.js';

const getFixturePath = (filename) => path.join(process.cwd(), '__fixtures__', filename);
const getResult = (filename1, filename2, format = 'stylish') => {
  const filepath1 = getFixturePath(filename1);
  const filepath2 = getFixturePath(filename2);
  return gendiff(filepath1, filepath2, format);
};

test('shoult work1', () => {
  const result = getResult('yaml1.yaml', 'json2.json', 'plain');
  const expected = readFileSync(getFixturePath('expected_plain1.txt'), 'utf-8');
  expect(result).toBe(expected);
});

test('shoult work2', () => {
  const result = getResult('yaml2.yml', 'json1.json', 'plain');
  const expected = readFileSync(getFixturePath('expected_plain2.txt'), 'utf-8');
  expect(result).toBe(expected);
});
test('should work3', () => {
  const result = getResult('yaml1.yaml', 'empty.json', 'plain');
  const expected = readFileSync(getFixturePath('expected_plain3.txt'), 'utf-8');
  expect(result).toBe(expected);
});

test('should work4', () => {
  const result = getResult('empty.yml', 'empty.json', 'plain');
  const expected = '';
  expect(result).toBe(expected);
});
