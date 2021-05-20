import yupFactory from './yupFactory';
import email from './validators/email';
import phone from './validators/phone';
import date from './validators/date';
import dob from './validators/dob';
import name from './validators/name';
import multipleChoice from './validators/multipleChoice';

import { expect, jest, test } from '@jest/globals';

jest.mock('./validators/email');
jest.mock('./validators/phone');
jest.mock('./validators/date');
jest.mock('./validators/dob');
jest.mock('./validators/name');
jest.mock('./validators/multipleChoice');

test('Invalid validation returns null', () => {
  expect(yupFactory('invalid_rule', [])).toBeNull();
});

test('Email validation returns email validator', () => {
  email.mockReturnValue('email_validator');

  expect(yupFactory('email', [])).toBe('email_validator');
});

test('Phone validation returns phone validator', () => {
  phone.mockReturnValue('phone_validator');

  expect(yupFactory('phone', [])).toBe('phone_validator');
});

test('Date validation returns date validator', () => {
  const params = { 'from-days': 0 };
  date.mockReturnValue('date_validator');

  expect(yupFactory('date', params)).toBe('date_validator');
  expect(date).toBeCalledWith(params);
});

test('DOB validation returns dob validator', () => {
  const params = { minAge: 18 };
  dob.mockReturnValue('dob_validator');

  expect(yupFactory('dob', params)).toBe('dob_validator');
  expect(dob).toBeCalledWith(params);
});

test('Name validation returns name validator', () => {
  const params = { min: 2, max: 20 };
  name.mockReturnValue('name_validator');

  expect(yupFactory('name', params)).toBe('name_validator');
  expect(name).toBeCalledWith(params);
});

test('Multi choice validation returns multi choice validator', () => {
  const params = { min: 1 };
  multipleChoice.mockReturnValue('multiple_choice_validator');

  expect(yupFactory('multiple_choice', params)).toBe(
    'multiple_choice_validator'
  );
  expect(multipleChoice).toBeCalledWith(params);
});
