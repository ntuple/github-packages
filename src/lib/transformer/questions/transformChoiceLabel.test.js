import { describe, expect, it } from '@jest/globals';
import transformChoiceLabel from './transformChoiceLabel';

const questionGender = {
  order: 16,
    title: 'What is your gender?',
    type: 'singlechoice',
    singlechoice: {
    choices: [
      {
        label: 'Male',
        value: 'M',
      },
      {
        label: 'Female',
        value: 'F',
      },
    ],
      popularcount: 0,
  },
  annotations: {
    'rf/buttons-per-row': '2',
      'rf/popular-choice-icon-srcset-template':
    '/qflow/static/genders/__value__.svg?0',
      'rf/tip-text':
    'Please select your gender. Some insurers might apply a gender dependent discount.',
      'rf/translation-choice-prefix': 'motor:questions.choices.gender.',
      'rf/translation-label': 'motor:questions.labels.gender',
      'rf/translation-tooltip': 'motor:questions.tooltips.gender',
  },
};
const questionTerms = {
  order: 22,
    type: 'singlechoice',
    singlechoice: {
    choices: [
      {
        label: 'Yes, I accept',
        value: 'true',
      },
      {
        label: "No, I don't accept",
        value: 'false',
      },
    ],
      popularcount: 0,
  },
  annotations: {
    'rf/cta-label': 'SHOW QUOTES',
      'rf/html-bottom':
    '<p>Click proceed to accept our privacy policy and terms of use. Before purchasing a product, please ensure you have understood the coverage details.</p>',
      'rf/html-top':
    '<p>In order for Rabbit Finance to process your personal information and to provide services to you, kindly acknowledge the below:</p><p>I would like to receive latest offers from Rabbit Finance and consent to the collection, use, and disclosure of my data to companies in the Rabbit ecosystem (incl. affiliates, subsidiaries, business partners) for marketing, data analytics, and other business purposes outlined in the privacy policy</p>',
  },
};

describe('transformChoiceLabel: transform choice label', () => {
  it('transform choice label', () => {
    let singleChoice = questionGender['singlechoice'];
    let choice = singleChoice.choices[0];
    let transformedLabel = transformChoiceLabel(
      choice,
      questionGender.annotations
    );
    expect(transformedLabel).toEqual('motor:questions.choices.gender.M');
  });
});

describe('transformChoiceLabel: transform choice label', () => {
  it('return choice label when no prefix in annotations', () => {
    let singleChoice = questionTerms['singlechoice'];
    let choice = singleChoice.choices[0];
    let transformedLabel = transformChoiceLabel(
      choice,
      questionTerms.annotations
    );
    expect(transformedLabel).toEqual('Yes, I accept');
  });
});
