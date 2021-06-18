import { test, expect } from '@jest/globals';
import path from 'path';
import { readFileSync } from 'fs';
import parseFile from '../src/parsers.js';
import compare from '../src/compare.js';
import gendiff from '../src/index.js';
import { getFixturePath } from '../testUtils.js';

const getTestData = (filename1, filename2) => {
  const filepath1 = getFixturePath(filename1);
  const filepath2 = getFixturePath(filename2);
  const result = gendiff(filepath1, filepath2, 'json');
  const data1 = parseFile(readFileSync(filepath1, 'utf8'), path.extname(filepath1).slice(1));
  const data2 = parseFile(readFileSync(filepath2, 'utf8'), path.extname(filepath2).slice(1));
  const compared = compare(data1, data2);
  const expected = JSON.stringify(compared);
  return { result, expected };
};

test('shoult work1', () => {
  const { result, expected } = getTestData('Yaml1.yaml', 'json2.json');
  expect(result).toBe(expected);
});

test('shoult work2', () => {
  const { result, expected } = getTestData('Yaml2.yml', 'json1.json');
  expect(result).toBe(expected);
});
test('should work3', () => {
  const { result, expected } = getTestData('Yaml1.yaml', 'empty.json');
  expect(result).toBe(expected);
});

test('should work4', () => {
  const { result, expected } = getTestData('empty.yml', 'empty.json');
  expect(result).toBe(expected);
});
