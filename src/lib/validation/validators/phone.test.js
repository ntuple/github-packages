import phone from './phone';
import { expect, test } from '@jest/globals';

test('Valid Phone Number', () => {
  const validator = phone();

  expect(validator.isValidSync('0941231238')).toBeTruthy();
});

test('Empty Phone Number is invalid', () => {
  const validator = phone();

  expect(validator.isValidSync('')).toBeFalsy();
});

test('Short Phone Number is invalid', () => {
  const validator = phone();

  expect(validator.isValidSync('123456789')).toBeFalsy();
});

test('Long Phone Number is invalid', () => {
  const validator = phone();

  expect(validator.isValidSync('12345678901')).toBeFalsy();
});
