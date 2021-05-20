import { test, expect } from '@jest/globals';
import { sortBy, groupBy } from './array';

test('it should sort filter numbers', () => {
  const data = [{ price: 1.1 }, { price: 1 }, { price: 100 }, { price: -1 }];
  const expectedASC = [
    { price: -1 },
    { price: 1 },
    { price: 1.1 },
    { price: 100 },
  ];

  const expectedDESC = [
    { price: 100 },
    { price: 1.1 },
    { price: 1 },
    { price: -1 },
  ];
  expect(sortBy(data, 'price')).toEqual(expectedASC);

  expect(sortBy(data, 'price', 'DESC')).toEqual(expectedDESC);
});

test('it should throw exception if tried to filter by [non-integer]', () => {
  const data = [{ title: 'fake-title1' }, { title: 'fake-title2' }];

  const testFunc = () => {
    sortBy(data, 'title');
  };
  expect(testFunc).toThrow('not supported!');
});

test('it should group items with same key', () => {
  const data = [
    { title: 'fake-title1', company_id: 1 },
    { title: 'fake-title2', company_id: 2 },
    { title: 'fake-title3', company_id: 3 },
    { title: 'fake-title4', company_id: 1 },
  ];

  const expected = {
    '1': [
      { title: 'fake-title1', company_id: 1 },
      { title: 'fake-title4', company_id: 1 },
    ],
    '2': [{ title: 'fake-title2', company_id: 2 }],
    '3': [{ title: 'fake-title3', company_id: 3 }],
  };
  expect(groupBy(data, 'company_id')).toEqual(expected);
});
