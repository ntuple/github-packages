import defaultRule from './default';
import { expect, test } from '@jest/globals';

const validTexts = [
  '1',
  '0',
  'Jones Salad',
  '108 Shop',
  'Bangkok Bank', // company name
  'Sukumvit 23', // Address
  'reg.2020-01-01-1111', // Tax Id
];

const invalidTexts = ['', null, undefined];

test('Valid Texts', () => {
  const validator = defaultRule({ min: 1, max: 100 });

  validTexts.forEach((exampleText) => {
    expect(validator.isValidSync(exampleText)).toBeTruthy();
  });
});

test('Invalid Texts', () => {
  const validator = defaultRule({});

  invalidTexts.forEach((exampleText) => {
    expect(validator.isValidSync(exampleText)).toBeFalsy();
  });
});
