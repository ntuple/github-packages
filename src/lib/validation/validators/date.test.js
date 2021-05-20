import date from './date';
import { expect, test } from '@jest/globals';
import moment from 'moment';

test('Valid Date with no limits', () => {
  const validator = date({});

  expect(validator.isValidSync('01/01/1998')).toBeTruthy();
});

test('Valid Thai Date with no limits', () => {
  const validator = date({});

  expect(validator.isValidSync('01/01/2563')).toBeTruthy();
});

test('Valid Future Date for today', () => {
  const validator = date({ from_days: 0 });
  const testDate = moment();

  expect(validator.isValidSync(testDate.format('DD/MM/YYYY'))).toBeTruthy();
});

test('Valid Date with from days', () => {
  const validator = date({ from_days: -5 });
  const testDate = moment().subtract(-4, 'days');

  expect(validator.isValidSync(testDate.format('DD/MM/YYYY'))).toBeTruthy();
});

test('Valid Thai Date with from days', () => {
  const validator = date({ from_days: -5 });
  const testDate = moment().subtract(-4, 'days').add(543, 'years');

  expect(validator.isValidSync(testDate.format('DD/MM/YYYY'))).toBeTruthy();
});

test('Invalid Thai Date with from days', () => {
  const validator = date({ from_days: 5 });
  const testDate = moment().subtract(6, 'days').add(543, 'years');

  expect(validator.isValidSync(testDate.format('DD/MM/YYYY'))).toBeFalsy();
});

test('Valid Date with to days', () => {
  const validator = date({ to_days: 5 });
  const testDate = moment().add(4, 'days');

  expect(validator.isValidSync(testDate.format('DD/MM/YYYY'))).toBeTruthy();
});

test('Invalid Date with to days', () => {
  const validator = date({ to_days: 5 });
  const testDate = moment().add(6, 'days');

  expect(validator.isValidSync(testDate.format('DD/MM/YYYY'))).toBeFalsy();
});

test('Valid Thai Date with to days', () => {
  const validator = date({ to_days: 5 });
  const testDate = moment().add(4, 'days').add(543, 'years');

  expect(validator.isValidSync(testDate.format('DD/MM/YYYY'))).toBeTruthy();
});

test('Invalid Thai Date with to days', () => {
  const validator = date({ to_days: 5 });
  const testDate = moment().add(6, 'days').add(543, 'years');

  expect(validator.isValidSync(testDate.format('DD/MM/YYYY'))).toBeFalsy();
});

test('Valid Date with from and to days', () => {
  const validator = date({ from_days: -1, to_days: 1 });
  const testDate = moment();

  expect(validator.isValidSync(testDate.format('DD/MM/YYYY'))).toBeTruthy();
});

test('Valid Thai Date with from and to days', () => {
  const validator = date({ from_days: -1, to_days: 1 });
  const testDate = moment().add(543, 'years');

  expect(validator.isValidSync(testDate.format('DD/MM/YYYY'))).toBeTruthy();
});

test('Invalid Date with from and to days (too early)', () => {
  const validator = date({ from_days: -1, to_days: 1 });
  const testDate = moment().subtract(2, 'days');

  expect(validator.isValidSync(testDate.format('DD/MM/YYYY'))).toBeFalsy();
});

test('Invalid Date with from and to days (too late)', () => {
  const validator = date({ from_days: -1, to_days: 1 });
  const testDate = moment().add(2, 'days');

  expect(validator.isValidSync(testDate.format('DD/MM/YYYY'))).toBeFalsy();
});

test('Invalid Thai Date with from and to days (too early)', () => {
  const validator = date({ from_days: -1, to_days: 1 });
  const testDate = moment().subtract(2, 'days').add(543, 'years');

  expect(validator.isValidSync(testDate.format('DD/MM/YYYY'))).toBeFalsy();
});

test('Invalid Thai Date with from and to days (too late)', () => {
  const validator = date({ from_days: -1, to_days: 1 });
  const testDate = moment().add(2, 'days').add(543, 'years');

  expect(validator.isValidSync(testDate.format('DD/MM/YYYY'))).toBeFalsy();
});

test('Null Date with no limits', () => {
  const validator = date({});

  expect(validator.isValidSync()).toBeTruthy();
});

test('Null Date with limits', () => {
  const validator = date({ from_days: 0, to_days: 183 });

  expect(validator.isValidSync()).toBeTruthy();
});

test('Undefined Date with no limits', () => {
  const validator = date({});

  expect(validator.isValidSync(undefined)).toBeTruthy();
});

test('Undefined Date with limits', () => {
  const validator = date({ from_days: 0, to_days: 183 });

  expect(validator.isValidSync(undefined)).toBeTruthy();
});
