import { describe, expect, it } from '@jest/globals';
import transformMultiChoice from './transformMultiChoice';

const question = {
  order: 21,
  title: 'Which type of insurance would you like?',
  type: 'multichoice',
  multichoice: {
    choices: [
      {
        label: 'Type 1',
        value: 'Type 1',
        annotations: {
          'rf/description':
            'motor:questions.checkboxes.insurance_voluntary.type_1.description',
          'rf/icon': 'thumbsup',
          'rf/label':
            'motor:questions.checkboxes.insurance_voluntary.type_1.label',
          'rf/subtitle':
            'motor:questions.checkboxes.insurance_voluntary.type_1.subtitle',
        },
      },
      {
        label: 'Type 2+/3+',
        value: 'Type 2+',
        annotations: {
          'rf/description':
            'motor:questions.checkboxes.insurance_voluntary.type_2+_3+.description',
          'rf/label':
            'motor:questions.checkboxes.insurance_voluntary.type_2+_3+.label',
          'rf/subtitle':
            'motor:questions.checkboxes.insurance_voluntary.type_2+_3+.subtitle',
        },
      },
    ],
    popularcount: 0,
  },
  annotations: {
    'rf/tip-text':
      'We have several voluntary insurance types for you to compare and purchase, depending on your coverage needs and budget. Please select each insurance type you would like to compare on the quote page.',
    'rf/translation-label': 'motor:questions.labels.insurance_voluntary',
    'rf/translation-tooltip': 'motor:questions.tooltips.insurance_voluntary',
  },
};

const expectedCheckboxes = [
  {
    value: 'Type 1',
    label: 'motor:questions.checkboxes.insurance_voluntary.type_1.label',
    icon: 'thumbsup',
    title: 'motor:questions.checkboxes.insurance_voluntary.type_1.subtitle',
    desc: 'motor:questions.checkboxes.insurance_voluntary.type_1.description',
  },
  {
    value: 'Type 2+',
    label: 'motor:questions.checkboxes.insurance_voluntary.type_2+_3+.label',
    title: 'motor:questions.checkboxes.insurance_voluntary.type_2+_3+.subtitle',
    desc:
      'motor:questions.checkboxes.insurance_voluntary.type_2+_3+.description',
  },
];

describe('transform single choice checkbox', () => {
  it('return single choice question config', () => {
    let multiQuestion = transformMultiChoice(question);
    expect(multiQuestion).toEqual(
      expect.objectContaining({
        type: 'square_checkboxes',
      })
    );
    expect(multiQuestion.checkboxes).toEqual(expectedCheckboxes);
    expect(multiQuestion.checkboxes.length).toEqual(2);
  });
});
