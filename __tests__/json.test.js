import { test, expect } from '@jest/globals';
import path from 'path';
import process from 'process';
import gendiff from '../src/index.js';

const getFixturePath = (filename) => path.join(process.cwd(), '__fixtures__', filename);

test('shoult work1', () => {
  const filepath1 = getFixturePath('Yaml1.yaml');
  const filepath2 = getFixturePath('json2.json');
  const result = gendiff(filepath1, filepath2, 'json');
  const expected = '{"common":{"value":{"setting1":{"status":"changed","from":"Value 10","to":"Value 1"},"setting2":{"status":"deleted","value":300},"setting3":{"status":"changed","from":"somevalue","to":null},"setting6":{"value":{"key":{"status":"changed","from":"status","to":"value"},"doge":{"value":{"wow":{"status":"changed","from":"12","to":"so much"}}},"ops":{"status":"added","value":"vops"}}},"follow":{"status":"added","value":false},"setting4":{"status":"added","value":"blah blah"},"setting5":{"status":"added","value":{"key5":"value5"}}}},"group1":{"value":{"baz":{"status":"changed","from":"bas","to":"bars"},"foo":{"status":"unchanged","value":"bar"},"nest":{"status":"changed","from":{"key":"value"},"to":"str"}}},"group2":{"status":"deleted","value":{"abc":12345,"deep":{"id":90}}},"group3":{"status":"added","value":{"deep":{"id":{"number":45}},"fee":100500}}}';
  expect(result).toBe(expected);
});

test('shoult work2', () => {
  const filepath1 = getFixturePath('Yaml2.yml');
  const filepath2 = getFixturePath('json1.json');
  const result = gendiff(filepath1, filepath2, 'json');
  const expected = '{"common":{"value":{"follow":{"status":"deleted","value":false},"setting1":{"status":"unchanged","value":"Value 1"},"setting3":{"status":"changed","from":null,"to":true},"setting4":{"status":"deleted","value":"blah blah"},"setting5":{"status":"deleted","value":{"key5":"value5"}},"setting6":{"value":{"key":{"status":"unchanged","value":"value"},"ops":{"status":"deleted","value":"vops"},"doge":{"value":{"wow":{"status":"changed","from":"so much","to":""}}}}},"setting2":{"status":"added","value":200}}},"group1":{"value":{"foo":{"status":"unchanged","value":"bar"},"baz":{"status":"changed","from":"bars","to":"bas"},"nest":{"status":"changed","from":"str","to":{"key":"value"}}}},"group3":{"status":"deleted","value":{"deep":{"id":{"number":45}},"fee":100500}},"group2":{"status":"added","value":{"abc":12345,"deep":{"id":45}}}}';
  expect(result).toBe(expected);
});
