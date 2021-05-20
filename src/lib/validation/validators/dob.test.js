import dob from './dob';
import { expect, test } from '@jest/globals';
import moment from 'moment';

test('Valid Date', () => {
  const validator = dob({});

  expect(validator.isValidSync('01/01/1998')).toBeTruthy();
});

test('Valid Thai Date', () => {
  const validator = dob({});

  expect(validator.isValidSync('01/01/2541')).toBeTruthy();
});

test('Invalid Date in the future', () => {
  const validator = dob({});
  const futureDate = moment().add(1, 'days');

  expect(validator.isValidSync(futureDate.format('DD/MM/YYYY'))).toBeFalsy();
});

test('Valid Date above minimum age', () => {
  const validator = dob({ min_age: 18 });

  const validDate = moment().subtract(18, 'years').subtract(1, 'days');

  expect(validator.isValidSync(validDate.format('DD/MM/YYYY'))).toBeTruthy();
});

test('Valid Thai Date above minimum age', () => {
  const validator = dob({ min_age: 18 });

  const validDate = moment()
    .subtract(18, 'years')
    .subtract(1, 'days')
    .add(543, 'years');

  expect(validator.isValidSync(validDate.format('DD/MM/YYYY'))).toBeTruthy();
});

test('Invalid Date below minimum age', () => {
  const validator = dob({ min_age: 18 });

  const invalidDate = moment().subtract(17, 'years');

  expect(validator.isValidSync(invalidDate.format('DD/MM/YYYY'))).toBeFalsy();
});

test('Invalid Thai Date below minimum age', () => {
  const validator = dob({ min_age: 18 });

  const invalidDate = moment().subtract(17, 'years').add(543, 'years');

  expect(validator.isValidSync(invalidDate.format('DD/MM/YYYY'))).toBeFalsy();
});

test('Valid Date below maximum age', () => {
  const validator = dob({ max_age: 100 });

  const validDate = moment().subtract(99, 'years');

  expect(validator.isValidSync(validDate.format('DD/MM/YYYY'))).toBeTruthy();
});

test('Valid Thai Date below maximum age', () => {
  const validator = dob({ max_age: 100 });

  const validDate = moment().subtract(99, 'years').add(543, 'years');

  expect(validator.isValidSync(validDate.format('DD/MM/YYYY'))).toBeTruthy();
});

test('Invalid Date above maximum age', () => {
  const validator = dob({ max_age: 100 });

  const invalidDate = moment().subtract(100, 'years').subtract(1, 'days');

  expect(validator.isValidSync(invalidDate.format('DD/MM/YYYY'))).toBeFalsy();
});

test('Invalid Thai Date above maximum age', () => {
  const validator = dob({ max_age: 100 });
  const invalidDate = moment()
    .subtract(100, 'years')
    .subtract(1, 'days')
    .add(543, 'years');
  expect(validator.isValidSync(invalidDate.format('DD/MM/YYYY'))).toBeFalsy();
});

test('Valid date between min age and max age', () => {
  const validator = dob({ min_age: 18, max_age: 100 });

  const validDate = moment().subtract(20, 'years');

  expect(validator.isValidSync(validDate.format('DD/MM/YYYY'))).toBeTruthy();
});

test('Valid Thai date between min age and max age', () => {
  const validator = dob({ min_age: 18, max_age: 100 });

  const validDate = moment().subtract(20, 'years').add(543, 'years');

  expect(validator.isValidSync(validDate.format('DD/MM/YYYY'))).toBeTruthy();
});

test('Valid date that is equal with max age', () => {
  const validator = dob({ max_age: 100 });

  const validDate = moment().subtract(100, 'years');

  expect(validator.isValidSync(validDate.format('DD/MM/YYYY'))).toBeTruthy();
});

test('Valid Thai date that is equal with max age', () => {
  const validator = dob({ max_age: 100 });

  const validDate = moment().subtract(100, 'years').add(543, 'years');

  expect(validator.isValidSync(validDate.format('DD/MM/YYYY'))).toBeTruthy();
});

test('Valid date that is equal with max age on 12:00 am', () => {
  const validator = dob({ max_age: 100 });

  const validDate = moment().subtract(100, 'years').startOf('date'); // for the date of 100 years old who is born at exact 12:00 am

  expect(validator.isValidSync(validDate.format('DD/MM/YYYY'))).toBeTruthy();
});

test('Valid Thai date that is equal with max age on 12:00 am', () => {
  const validator = dob({ max_age: 100 });

  const validDate = moment()
    .subtract(100, 'years')
    .add(543, 'years')
    .startOf('date'); // for the date of 100 years old who is born at exact 12:00 am
  expect(validator.isValidSync(validDate.format('DD/MM/YYYY'))).toBeTruthy();
});
