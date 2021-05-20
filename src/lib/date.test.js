import { convertToMoment, isThaiYear, normalizeDate } from './date';
import { expect, test } from '@jest/globals';
import { isMoment } from 'moment';

test('Convert Date object to moment successfully', () => {
  const original = '2020-06-12';
  const date = new Date(original);
  const momentDate = convertToMoment(date);

  expect(isMoment(momentDate)).toBeTruthy();
  expect(momentDate.format('YYYY-MM-DD')).toBe(original);
});

test('Convert DD/MM/YYYY to moment successfully', () => {
  const original = '12/06/2020';
  const expected = '2020-06-12';
  const momentDate = convertToMoment(original);

  expect(isMoment(momentDate)).toBeTruthy();
  expect(momentDate.format('YYYY-MM-DD')).toBe(expected);
});

test('Convert YYYY-MM-DD to moment successfully', () => {
  const original = '2020-06-12';
  const momentDate = convertToMoment(original);

  expect(isMoment(momentDate)).toBeTruthy();
  expect(momentDate.format('YYYY-MM-DD')).toBe(original);
});

test('Detect Thai Date correctly', () => {
  const date = '2561-06-12';

  expect(isThaiYear(date)).toBeTruthy();
});

test('Detect Western Date correctly', () => {
  const date = '2061-06-12';

  expect(isThaiYear(date)).toBeFalsy();
});

test('Normalize Western Date correctly', () => {
  const date = '2061-06-12';

  expect(normalizeDate(date).format('YYYY-MM-DD')).toBe(date);
});

test('Normalize Thai Date correctly', () => {
  const date = '2561-06-12';
  const expected = '2018-06-12';

  expect(normalizeDate(date).format('YYYY-MM-DD')).toBe(expected);
});
