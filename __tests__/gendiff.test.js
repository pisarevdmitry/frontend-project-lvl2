import { test, expect, describe } from '@jest/globals';
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

describe('stylish tests', () => {
  const testsData = [
    [getResult('file1.json', 'file2.yml'), readFileSync(getFixturePath('expected_stylish1.txt'), 'utf-8')],
    [getResult('file1.yaml', 'file2.json'), readFileSync(getFixturePath('expected_stylish2.txt'), 'utf-8')],
    [getResult('file1.yaml', 'empty_file1.json'), readFileSync(getFixturePath('expected_stylish3.txt'), 'utf-8')],
    [getResult('empty_file1.yml', 'empty_file1.json'), '{\n\n}'],
  ];
  test.each(testsData)('should work %#', (result, expected) => {
    expect(result).toBe(expected);
  });
});

describe('plain tests', () => {
  const testsData = [
    [getResult('file1.yaml', 'file2.json', 'plain'), readFileSync(getFixturePath('expected_plain1.txt'), 'utf-8')],
    [getResult('file2.yml', 'file1.json', 'plain'), readFileSync(getFixturePath('expected_plain2.txt'), 'utf-8')],
    [getResult('file1.yaml', 'empty_file1.json', 'plain'), readFileSync(getFixturePath('expected_plain3.txt'), 'utf-8')],
    [getResult('empty_file1.yml', 'empty_file1.json', 'plain'), ''],
  ];
  test.each(testsData)('should work %#', (result, expected) => {
    expect(result).toBe(expected);
  });
});

describe('json tests', () => {
  const testsData = [
    [getResult('file1.yaml', 'file2.json', 'json'), readFileSync(getFixturePath('expected_json1.json'), 'utf-8')],
    [getResult('file2.yml', 'file1.json', 'json'), readFileSync(getFixturePath('expected_json2.json'), 'utf-8')],
    [getResult('file1.yaml', 'empty_file1.json', 'json'), readFileSync(getFixturePath('expected_json3.json'), 'utf-8')],
    [getResult('empty_file1.yml', 'empty_file1.json', 'json'), '{"type":"root","children":[]}'],
  ];
  test.each(testsData)('should work %#', (result, expected) => {
    expect(result).toBe(expected);
  });
});
