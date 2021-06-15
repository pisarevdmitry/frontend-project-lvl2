import { test, expect } from '@jest/globals';
import path from 'path';
import process from 'process';
import gendiff from '../src/index.js';

const getFixturePath = (filename) => path.join(process.cwd(), '__fixtures__', filename);

test('test plain json', () => {
  const filepath1 = getFixturePath('plainJson1.json');
  const filepath2 = getFixturePath('plainJson2.json');
  const result = gendiff(filepath1, filepath2);
  const expected = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;
  expect(result).toBe(expected);
});
test('test if 1 json is empty', () => {
  const filepath1 = getFixturePath('plainJson1.json');
  const filepath2 = getFixturePath('empty.json');
  const result = gendiff(filepath1, filepath2);
  const expected = `{
  - follow: false
  - host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
}`;
  expect(result).toBe(expected);
});
