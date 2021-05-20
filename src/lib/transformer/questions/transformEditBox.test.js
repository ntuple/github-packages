import { describe, expect, it } from '@jest/globals';
import transformEditBox from './transformEditBox';

const editBoxQuestions = {
  customer_email: {
    title: 'What is your email?',
    placeholder: 'Ex: example@gmail.com',
    type: 'editbox',
    validation: {
      rule: 'email',
    },
  },
  customer_first_name: {
    title: 'What is your first name?',
    placeholder: 'Ex: Maleena',
    type: 'editbox',
    validation: {
      rule: 'name',
      min: 0,
      max: 40,
    },
  },
  customer_phone: {
    title: 'What is your phone number?',
    placeholder: 'Ex: 0810000000',
    type: 'editbox',
    validation: {
      rule: 'phone',
    },
  },
};

describe('transformEditBox: transform editbox as text', () => {
  it('return type as text and placeholder', () => {
    let question = transformEditBox(editBoxQuestions.customer_first_name);
    expect(question).toEqual({
      type: 'text',
      placeholder: 'Ex: Maleena',
    });
  });
});

describe('transformEditBox: transform editbox as phone', () => {
  it('return type as phone and placeholder', () => {
    let question = transformEditBox(editBoxQuestions.customer_phone);
    expect(question).toEqual({
      type: 'phone',
      placeholder: 'Ex: 0810000000',
    });
  });
});

describe('transformEditBox: transform editbox as email', () => {
  it('return type as email and placeholder', () => {
    let question = transformEditBox(editBoxQuestions.customer_email);
    expect(question).toEqual({
      type: 'email',
      placeholder: 'Ex: example@gmail.com',
    });
  });
});
