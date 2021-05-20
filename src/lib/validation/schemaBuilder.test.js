import yupFactory from './yupFactory';
import schemaBuilder from './schemaBuilder';
import { beforeEach, expect, jest, test } from '@jest/globals';

jest.mock('./yupFactory');

beforeEach(() => {
  yupFactory.mockClear();
});

test('Empty Questions gives Empty Schema', () => {
  const questions = {};

  expect(schemaBuilder(questions)).toStrictEqual({});
  expect(yupFactory).toBeCalledTimes(0);
});

test('Questions with no validation gives default Schema', () => {
  const questions = {
    customer_phone: {
      order: 12,
      title: 'What is your phone?',
      placeholder: 'Phone',
      type: 'editbox',
    },
  };

  yupFactory.mockReturnValue('validationObject');

  const schema = schemaBuilder(questions);

  expect(schema).toStrictEqual({ customer_phone: 'validationObject' });
});

test('Question with unknown validation gives Empty Schema', () => {
  const questions = {
    customer_phone: {
      order: 12,
      title: 'What is your phone?',
      placeholder: 'Phone',
      type: 'editbox',
      validation: {
        rule: 'unknown_rule',
        param1: 'param1',
        param2: 'param2',
      },
    },
  };

  yupFactory.mockReturnValue(null);

  const schema = schemaBuilder(questions);

  expect(schema).toStrictEqual({});
  expect(yupFactory).toBeCalledTimes(1);
});

test('Question with known validation gives Schema', () => {
  const questions = {
    phone: {
      order: 12,
      title: 'What is your phone?',
      placeholder: 'Phone',
      type: 'editbox',
      validation: {
        rule: 'known_rule',
        param1: 'param1',
        param2: 'param2',
      },
    },
  };

  yupFactory.mockReturnValue('validationObject');

  const schema = schemaBuilder(questions);

  expect(schema).toStrictEqual({ phone: 'validationObject' });
  expect(yupFactory).toBeCalledTimes(1);
});

test('Question with multiple known validation gives Schema', () => {
  const questions = {
    phone: {
      order: 1,
      title: 'What is your phone?',
      placeholder: 'Phone',
      type: 'editbox',
      validation: {
        rule: 'known_rule_one',
        param1: 'param1',
      },
    },
    email: {
      order: 2,
      title: 'What is your Email?',
      placeholder: 'Email',
      type: 'editbox',
      validation: {
        rule: 'known_rule_two',
      },
    },
  };

  yupFactory.mockReturnValueOnce('validationObjectOne');
  yupFactory.mockReturnValueOnce('validationObjectTwo');

  const schema = schemaBuilder(questions);

  expect(schema).toStrictEqual({
    phone: 'validationObjectOne',
    email: 'validationObjectTwo',
  });
  expect(yupFactory).toBeCalledTimes(2);
  expect(yupFactory).toHaveBeenNthCalledWith(1, 'known_rule_one', {
    param1: 'param1',
  });
  expect(yupFactory).toHaveBeenNthCalledWith(2, 'known_rule_two', {});
});
