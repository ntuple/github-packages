import name from './name';
import { expect, test } from '@jest/globals';

test('Valid Name', () => {
  const validator = name({});

  expect(validator.isValidSync('Joe Blogs')).toBeTruthy();
});

test('Valid Thai Name', () => {
  const validator = name({});

  expect(validator.isValidSync('เพื่อติดต่อกับ')).toBeTruthy();
});

test('Valid Name with min', () => {
  const validator = name({ min: 9 });

  expect(validator.isValidSync('Joe Blogs')).toBeTruthy();
});

test('Invalid Name with min', () => {
  const validator = name({ min: 10 });

  expect(validator.isValidSync('Joe Blogs')).toBeFalsy();
});

test('Valid Name with max', () => {
  const validator = name({ max: 10 });

  expect(validator.isValidSync('Joe Blogs')).toBeTruthy();
});

test('Invalid Name with max', () => {
  const validator = name({ max: 8 });

  expect(validator.isValidSync('Joe Blogs')).toBeFalsy();
});

test('Valid Name with min and max', () => {
  const validator = name({ min: 2, max: 10 });

  expect(validator.isValidSync('Joe Blogs')).toBeTruthy();
});

test('Invalid Name with min and max (too long)', () => {
  const validator = name({ min: 6, max: 8 });

  expect(validator.isValidSync('Joe Blogs')).toBeFalsy();
});

test('Invalid Name with min and max (too short)', () => {
  const validator = name({ min: 10, max: 12 });

  expect(validator.isValidSync('Joe Blogs')).toBeFalsy();
});

test('Invalid Name with numbers', () => {
  const validator = name({});

  expect(validator.isValidSync('Joe Blogs 1')).toBeFalsy();
});
