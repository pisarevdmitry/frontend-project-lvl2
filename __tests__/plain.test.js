import { test, expect } from '@jest/globals';
import path from 'path';
import process from 'process';
import gendiff from '../src/index.js';

const getFixturePath = (filename) => path.join(process.cwd(), '__fixtures__', filename);
const getResult = (filename1, filename2, format = 'stylish') => {
  const filepath1 = getFixturePath(filename1);
  const filepath2 = getFixturePath(filename2);
  return gendiff(filepath1, filepath2, format);
};

test('shoult work1', () => {
  const result = getResult('Yaml1.yaml', 'json2.json', 'plain');
  const expected = `Property 'common.follow' was added with value: false
Property 'common.setting1' was updated. From 'Value 10' to 'Value 1'
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From 'somevalue' to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '12' to 'so much'
Property 'common.setting6.key' was updated. From 'status' to 'value'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`;
  expect(result).toBe(expected);
});

test('shoult work2', () => {
  const result = getResult('Yaml2.yml', 'json1.json', 'plain');
  const expected = `Property 'common.follow' was removed
Property 'common.setting2' was added with value: 200
Property 'common.setting3' was updated. From null to true
Property 'common.setting4' was removed
Property 'common.setting5' was removed
Property 'common.setting6.doge.wow' was updated. From 'so much' to ''
Property 'common.setting6.ops' was removed
Property 'group1.baz' was updated. From 'bars' to 'bas'
Property 'group1.nest' was updated. From 'str' to [complex value]
Property 'group2' was added with value: [complex value]
Property 'group3' was removed`;
  expect(result).toBe(expected);
});
test('should work3', () => {
  const result = getResult('Yaml1.yaml', 'empty.json', 'plain');
  const expected = `Property 'common' was removed
Property 'group1' was removed
Property 'group2' was removed`;
  expect(result).toBe(expected);
});

test('should work4', () => {
  const result = getResult('empty.yml', 'empty.json', 'plain');
  const expected = '';
  expect(result).toBe(expected);
});
