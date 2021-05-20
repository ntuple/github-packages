import { describe, expect, it } from '@jest/globals';
import transformDate from './transformDate';


const dateQuestions = {
  customer_dob: {
    order: 17,
    title: 'What is your date of birth?',
    type: 'date',
    validation: {
      rule: 'dob',
    },
    date: {},
    annotations: {
      'rf/tip-text':
        'Please select the date of birth of the main driver. Some insurers might apply a age dependent discount.',
      'rf/translation-label': 'motor:questions.labels.dob',
      'rf/translation-tooltip': 'motor:questions.tooltips.dob',
    },
  },
  policy_start: {
    order: 19,
    title: 'When do you want your policy to start?',
    placeholder: 'DD / MM / YYYY',
    type: 'date',
    validation: {
      rule: 'future',
    },
    date: {
      presets: [
        {
          label: 'Today',
          delta_days: 0,
          annotations: {
            'rf/translation-string': 'motor:questions.date.presets.today',
          },
        },
        {
          label: 'This week',
          delta_days: 4,
          annotations: {
            'rf/translation-string': 'motor:questions.date.presets.next_week',
          },
        },
        {
          label: "I don't know yet",
          delta_days: null,
          annotations: {
            'rf/translation-string': 'motor:questions.date.presets.i_dont_know',
          },
        },
      ],
    },
    annotations: {
      'rf/skip-button-label': "I don't know yet",
      'rf/tip-text':
        'Please select the coverage start date for your new car insurance policy here.',
      'rf/translation-label': 'motor:questions.labels.policy_start',
      'rf/translation-tooltip': 'motor:questions.tooltips.policy_start',
    },
  },
};

describe('transformDate: transform date ', () => {
  it('return type as date if no placeholder', () => {
    let question = transformDate(dateQuestions.customer_dob);
    expect(question).toEqual({
      type: 'date',
    });
  });
});

describe('transformDate: transform date ', () => {
  it('return type as date and placeholder and presets', () => {
    let question = transformDate(dateQuestions.policy_start);
    expect(question).toEqual({
      type: 'date',
      placeholder: 'DD / MM / YYYY',
      presets: dateQuestions.policy_start['date'].presets,
    });
  });
});
