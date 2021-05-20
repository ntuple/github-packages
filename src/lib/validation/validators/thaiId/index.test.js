import thaiId from '.';
import { expect, test } from '@jest/globals';

const validIds = [
  '1234567890121',
  '9999999890127',
  '1101105694213',
  '9876543210016',
];

const invalidIds = [
  'abcdefghijklm',
  '1234567890123',
  'a123456789012',
  '1101105694217',
];

const param = {
  requiredIf: {
    field: 'customer_nationality',
    value: 'thai',
  },
};

test('Valid Thai IDs', () => {
  const validator = thaiId(param);

  validIds.forEach((exampleText) => {
    expect(validator.isValidSync(exampleText)).toBeTruthy();
  });
});

test('Invalid Thai IDs', () => {
  const validator = thaiId();

  invalidIds.forEach((invalidExampleText) => {
    const data = validator.isValidSync(invalidExampleText);
    expect(data).toBeFalsy();
  });
});
