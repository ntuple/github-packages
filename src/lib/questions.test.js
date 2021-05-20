import { describe, expect, it } from '@jest/globals';
import expectedData from '../data/test/multiQuestion.json';
import { findMultiQuestions, sortLabels } from './questions';

const questions = {
  customer_name: {
    order: 1,
    annotations: {
      'rf/show-next-on-same-page': '',
      'rf/tip-text':
        'Please enter the first name of the main driver. Insurers need your name for your insurance policy.',
      'rf/translation-label': 'motor:questions.labels.first_name',
      'rf/translation-placeholder': 'motor:questions.placeholders.first_name',
      'rf/translation-tooltip': 'motor:questions.tooltips.first_name',
    },
  },
  customer_first_name: {
    order: 2,
    annotations: {
      'rf/show-next-on-same-page': '',
      'rf/tip-text':
        'Please enter the first name of the main driver. Insurers need your first name for your insurance policy.',
      'rf/translation-label': 'motor:questions.labels.first_name',
      'rf/translation-placeholder': 'motor:questions.placeholders.first_name',
      'rf/translation-tooltip': 'motor:questions.tooltips.first_name',
    },
  },
  customer_last_name: {
    order: 3,
    annotations: {
      'rf/show-next-on-same-page': '',
      'rf/tip-text':
        'Please enter the first name of the main driver. Insurers need your last name for your insurance policy.',
      'rf/translation-label': 'motor:questions.labels.first_name',
      'rf/translation-placeholder': 'motor:questions.placeholders.first_name',
      'rf/translation-tooltip': 'motor:questions.tooltips.first_name',
    },
  },
  customer_nick_name: {
    order: 4,
    annotations: {
      'rf/tip-text':
        'Please enter the first name of the main driver. Insurers need your nick name for your insurance policy.',
      'rf/translation-label': 'motor:questions.labels.first_name',
      'rf/translation-placeholder': 'motor:questions.placeholders.first_name',
      'rf/translation-tooltip': 'motor:questions.tooltips.first_name',
    },
  },
  customer_email: {
    order: 5,
    annotations: {},
  },
  contact_address_1: {
    order: 7,
    annotations: {
      'rf/show-next-on-same-page': '',
    },
  },
  contact_address: {
    order: 6,
    annotations: {
      'rf/show-next-on-same-page': '',
    },
  },
  contact_address_2: {
    order: 8,
    annotations: {},
  },
};

const questionOrder = [
  'customer_name',
  'customer_first_name',
  'customer_last_name',
  'customer_nick_name',
  'customer_email',
  'contact_address',
  'contact_address_1',
  'contact_address_2',
];

const expectedSkipQuestions = [
  'customer_first_name',
  'customer_last_name',
  'customer_nick_name',
  'contact_address_1',
  'contact_address_2',
];

const carModels = [
  {
    label: 'Toyota',
    value: '54',
  },
  {
    label: 'Honda',
    value: '24',
  },
];

describe('sort the label according to order', () => {
  it('return the soring status according to ascending order', () => {
    let sorted = carModels.sort((a, b) => sortLabels(a, b, 'asc'));
    expect(sorted).toEqual([
      {
        label: 'Honda',
        value: '24',
      },
      {
        label: 'Toyota',
        value: '54',
      },
    ]);
  });
  it('return the soring status according to descending order', () => {
    let sorted = carModels.sort((a, b) => sortLabels(a, b, 'desc'));
    expect(sorted).toEqual([
      {
        label: 'Toyota',
        value: '54',
      },
      {
        label: 'Honda',
        value: '24',
      },
    ]);
  });
});

describe('findMultipleQuestions: transforms nested object if question has multiple question', () => {
  it('returns nested objects if multiple questions', () => {
    const { multiQuestions, skipQuestions } = findMultiQuestions(
      questions,
      questionOrder
    );
    expect(multiQuestions).toEqual(expectedData);
    expect(skipQuestions).toEqual(expectedSkipQuestions);
  });

  it('main key of multiple question should not be in skip questions', () => {
    const { multiQuestions, skipQuestions } = findMultiQuestions(
      questions,
      questionOrder
    );
    let mainKeys = Object.keys(multiQuestions);
    expect(skipQuestions).toEqual(expect.not.arrayContaining(mainKeys));
  });
});
