import { test, expect } from '@jest/globals';
import path from 'path';
import process from 'process';
import gendiff from '../src/index.js';

const getFixturePath = (filename) => path.join(process.cwd(), '__fixtures__', filename);

test('should work1', () => {
  const filepath1 = getFixturePath('json1.json');
  const filepath2 = getFixturePath('Yaml2.yml');
  const result = gendiff(filepath1, filepath2);
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

test('should work2', () => {
  const filepath1 = getFixturePath('Yaml1.yaml');
  const filepath2 = getFixturePath('json2.json');
  const result = gendiff(filepath1, filepath2, 'stylish');
  const expected = `{
    common: {
      + follow: false
      - setting1: Value 10
      + setting1: Value 1
      - setting2: 300
      - setting3: somevalue
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 12
              + wow: so much
            }
          - key: status
          + key: value
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
            id: 90
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
