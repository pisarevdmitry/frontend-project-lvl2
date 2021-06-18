import { test, expect } from '@jest/globals';
import path from 'path';
import process from 'process';
import { readFileSync } from 'fs';
import parseFile from '../src/parsers.js';
import compare from '../src/compare.js';
import gendiff from '../src/index.js';

const getFixturePath = (filename) => path.join(process.cwd(), '__fixtures__', filename);

test('shoult work1', () => {
  const filepath1 = getFixturePath('Yaml1.yaml');
  const filepath2 = getFixturePath('json2.json');
  const result = gendiff(filepath1, filepath2, 'json');
  const data1 = parseFile(readFileSync(filepath1, 'utf8'), path.extname(filepath1).slice(1));
  const data2 = parseFile(readFileSync(filepath2, 'utf8'), path.extname(filepath2).slice(1));
  const compared = compare(data1, data2);
  const expected = JSON.stringify(compared);
  expect(result).toBe(expected);
});

test('shoult work2', () => {
  const filepath1 = getFixturePath('Yaml2.yml');
  const filepath2 = getFixturePath('json1.json');
  const result = gendiff(filepath1, filepath2, 'json');
  const data1 = parseFile(readFileSync(filepath1, 'utf8'), path.extname(filepath1).slice(1));
  const data2 = parseFile(readFileSync(filepath2, 'utf8'), path.extname(filepath2).slice(1));
  const compared = compare(data1, data2);
  const expected = JSON.stringify(compared);
  expect(result).toBe(expected);
});
test('should work3', () => {
  const filepath1 = getFixturePath('Yaml1.yaml');
  const filepath2 = getFixturePath('empty.json');
  const result = gendiff(filepath1, filepath2, 'json');
  const data1 = parseFile(readFileSync(filepath1, 'utf8'), path.extname(filepath1).slice(1));
  const data2 = parseFile(readFileSync(filepath2, 'utf8'), path.extname(filepath2).slice(1));
  const compared = compare(data1, data2);
  const expected = JSON.stringify(compared);
  expect(result).toBe(expected);
});

test('should work4', () => {
  const filepath1 = getFixturePath('empty.yml');
  const filepath2 = getFixturePath('empty.json');
  const result = gendiff(filepath1, filepath2, 'json');
  const data1 = parseFile(readFileSync(filepath1, 'utf8'), path.extname(filepath1).slice(1));
  const data2 = parseFile(readFileSync(filepath2, 'utf8'), path.extname(filepath2).slice(1));
  const compared = compare(data1, data2);
  const expected = JSON.stringify(compared);
  expect(result).toBe(expected);
});
