import email from './email';
import { expect, test } from '@jest/globals';

/**
 * Valid Email Tests
 */
test('Valid Email', () => {
  const validator = email({});

  expect(validator.isValidSync('joe@blogs.com')).toBeTruthy();
});

/**
 * Invalid Email Tests
 */
test.each([
  ['No TLD', 'joe@blogs'],
  ['No @', 'joeblogs.com'],
  ['Has Space', 'joe @ blogs.com'],
  ['Double dot', 'jo..e@blogs.com'],
])('Invalid Email: %s', (title, testEmail) => {
  const validator = email();

  expect(validator.isValidSync(testEmail)).toBeFalsy();
});
