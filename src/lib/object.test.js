import { expect, test } from '@jest/globals';
import { flatten, isKeySet } from './object';

/**
 * Valid Key tests
 */
test.each([
  ['Zero', 0],
  ['Empty', ''],
  ['Zero String', '0'],
  ['False', false],
  ['String', 'test'],
  ['Integer', 123],
  ['Object', { this: 'that' }],
])('Valid Object Key: %s', (title, keyValue) => {
  const object = { test: keyValue };

  expect(isKeySet(object, 'test')).toBeTruthy();
});

test('Missing Object key', () => {
  const object = {};

  expect(isKeySet(object, 'test')).toBeFalsy();
});

test('it should flatten an object with array', () => {
  const data = {
    1: [
      { title: 'fake-title1', company_id: 1 },
      { title: 'fake-title4', company_id: 1 },
    ],
    2: [{ title: 'fake-title2', company_id: 2 }],
    3: [{ title: 'fake-title3', company_id: 3 }],
  };
  const expected = [
    { title: 'fake-title1', company_id: 1 },
    { title: 'fake-title4', company_id: 1 },
    { title: 'fake-title2', company_id: 2 },
    { title: 'fake-title3', company_id: 3 },
  ];

  expect(flatten(data)).toEqual(expected);
});
