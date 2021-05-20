import multipleChoice from './multipleChoice';
import { expect, test } from '@jest/globals';
const multipleChoiceData = ['Type 1', 'Type 2'];
const maxInvalidMulitChoiceData = ['Type 1', 'Type 2', 'Type 3', 'Type 4'];
test('Required multi choice', () => {
  const validator = multipleChoice({});

  expect(validator.isValidSync([])).toBeFalsy();
});

test('Valid multi choice', () => {
  const validator = multipleChoice({});

  expect(validator.isValidSync(multipleChoiceData)).toBeTruthy();
});

test('Invalid multi choice', () => {
  const validator = multipleChoice({ min: 3 }); // check minmum array length is properly validated

  expect(validator.isValidSync(multipleChoiceData)).toBeFalsy();
});

test('Valid multi choice with minimum parameter and maximum paramter', () => {
  const validator = multipleChoice({ min: 1, max: 2 });

  expect(validator.isValidSync(multipleChoiceData)).toBeTruthy();
});

test('Invalid multi choice with maximum parameter', () => {
  const validator = multipleChoice({ max: 3 });

  expect(validator.isValidSync(maxInvalidMulitChoiceData)).toBeFalsy();
});
