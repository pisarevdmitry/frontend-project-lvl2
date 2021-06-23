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

test('should work1', () => {
  const result = getResult('json1.json', 'Yaml2.yml');
  const expected = readFileSync(getFixturePath('expected_stylish1.txt'), 'utf-8');
  expect(result).toBe(expected);
});

test('should work2', () => {
  const result = getResult('Yaml1.yaml', 'json2.json');
  const expected = readFileSync(getFixturePath('expected_stylish2.txt'), 'utf-8');
  expect(result).toBe(expected);
});

test('should work3', () => {
  const result = getResult('Yaml1.yaml', 'empty.json');
  const expected = readFileSync(getFixturePath('expected_stylish3.txt'), 'utf-8');
  expect(result).toBe(expected);
});

test('should work4', () => {
  const result = getResult('empty.yml', 'empty.json');
  const expected = '{\n\n}';
  expect(result).toBe(expected);
});
