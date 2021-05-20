import { test, expect, jest } from '@jest/globals';

import Storage from './storage';
const storage = new Storage({ appName: 'test', defaults: {} });

const testData = [
  {
    key: 'long_text',
    value: 'Lorem Ipsum',
  },
  {
    key: 'a number',
    value: 1000,
  },
  {
    key: 'an array',
    value: ['item1', 'item2'],
  },
  {
    key: 'an object',
    value: {
      name: 'test name',
      age: 25,
      address: 'test address',
    },
  },
];

test('should store and retrive different data type correctly', () => {
  testData.forEach((data) => {
    storage.set(data.key, data.value);
    expect(storage.get(data.key)).toStrictEqual(data.value);
  });
});

test('should be only once', () => {
  storage.set('flash_key', 'my-data', {
    flash: true,
  });

  expect(storage.get('flash_key')).toBe('my-data');
  expect(storage.get('flash_key')).toBe(null);
});

test('should be only valid to for 1 hour', () => {
  storage.set('short_lived_key', 'my-data', {
    hours: 1, // live only for one hour
  });

  //before 1 hour
  let dt = new Date();
  Date.now = jest.fn(() => dt);
  expect(storage.get('short_lived_key')).toBe('my-data');

  // null after 2 hours
  let dt2 = new Date();
  dt2.setHours(dt2.getHours() + 2);
  Date.now = jest.fn(() => dt2);
  expect(storage.get('short_lived_key')).toBe(null);
});
