import { test, expect } from '@jest/globals';
import path from 'path';
import process from 'process';
import gendiff from '../src/index.js';

const getFixturePath = (filename) => path.join(process.cwd(), '__fixtures__', filename);

test('test  stylish', () => {
  const filepath1 = getFixturePath('json1.json');
  const filepath2 = getFixturePath('Yaml2.yml');
  const result = gendiff(filepath1, filepath2, 'stylish');
  const expected = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`;
  expect(result).toBe(expected);
});

test('test  plain', () => {
  const filepath1 = getFixturePath('Yaml1.yaml');
  const filepath2 = getFixturePath('json2.json');
  const result = gendiff(filepath1, filepath2, 'plain');
  const expected = `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`;
  expect(result).toBe(expected);
});
