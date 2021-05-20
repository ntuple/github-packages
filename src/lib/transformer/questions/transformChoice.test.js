import { describe, expect, it } from '@jest/globals';
import transformChoice from './transformChoice';

const choice = {
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
};

describe('transformMultiChoice: transform multi choice ', () => {
  it('transform choice', () => {
    let transformedChoice = transformChoice(choice);
    expect(transformedChoice).toEqual({
      value: 'Type 1',
      desc: 'motor:questions.checkboxes.insurance_voluntary.type_1.description',
      icon: 'thumbsup',
      label: 'motor:questions.checkboxes.insurance_voluntary.type_1.label',
      title: 'motor:questions.checkboxes.insurance_voluntary.type_1.subtitle',
    });
  });
});
