import { test, expect } from '@jest/globals';
import { getResult } from '../testUtils.js';

test('should work1', () => {
  const result = getResult('json1.json', 'Yaml2.yml');
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
  const result = getResult('Yaml1.yaml', 'json2.json');
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

test('should work3', () => {
  const result = getResult('Yaml1.yaml', 'empty.json');
  const expected = `{
  - common: {
        setting1: Value 10
        setting2: 300
        setting3: somevalue
        setting6: {
            doge: {
                wow: 12
            }
            key: status
        }
    }
  - group1: {
        baz: bas
        foo: bar
        nest: {
            key: value
        }
    }
  - group2: {
        abc: 12345
        deep: {
            id: 90
        }
    }
}`;
  expect(result).toBe(expected);
});

test('should work4', () => {
  const result = getResult('empty.yml', 'empty.json');
  const expected = '{\n\n}';
  expect(result).toBe(expected);
});
