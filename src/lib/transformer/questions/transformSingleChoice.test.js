import { describe, expect, it } from '@jest/globals';
import transformSingleChoice from './transformSingleChoice';

const questionModel = {
  order: 7,
  title: 'Which car is it?',
  dynamic_fetch: 'car',
  dynamic_fetch_groups: ['car', 'dp'],
  type: 'singlechoice',
  singlechoice: {
    choices: [
      {
        label:
          'Mazda 2 2015 __october__ __petrol__ 1.50 __manual__ 4 __doors__ Elegance Sedan',
        value: '7656',
      },
      {
        label:
          'Mazda 2 2015 __october__ __petrol__ 1.50 __manual__ 4 __doors__ Sports Hatchback',
        value: '7629',
      },
    ],
  },
  annotations: {
    'rf/always-show': 'true',
    'rf/banner-mobile-srcset':
      '/qflow/static/banners/__locale__/mobile/special-price.svg',
    'rf/banner-position': 'inside-top',
    'rf/banner-srcset':
      '/qflow/static/banners/__locale__/desktop/special-price.svg',
    'rf/buttons-per-row': '1',
    'rf/last-choice-jump-label':
      'motor:questions.choices.submodel.change_my_car',
    'rf/last-choice-jump-to': 'car_brand',
    'rf/singlechoice-dropdown': 'never',
    'rf/tip-text':
      'Please select one of the cars that match your submitted criteria.',
    'rf/translate-placeholders': '',
    'rf/translation-choice-prefix': 'motor:questions.choices.submodel.',
    'rf/translation-label': 'motor:questions.labels.submodel',
    'rf/translation-tooltip': 'motor:questions.tooltips.submodel',
  },
};
const questionYear = {
  order: 3,
  title: 'Which year was your car manufactured?',
  singlechoice: {
    choices: [
      { label: '2020 / 2563', value: '2020' },
      { label: '2019 / 2562', value: '2019' },
      { label: '2018 / 2561', value: '2018' },
      { label: '2017 / 2560', value: '2017' },
      { label: '2016 / 2559', value: '2016' },
      { label: '2015 / 2558', value: '2015' },
      { label: '2014 / 2557', value: '2014' },
      { label: '2013 / 2556', value: '2013' },
      { label: '2012 / 2555', value: '2012' },
      { label: '2011 / 2554', value: '2011' },
      { label: '2010 / 2553', value: '2010' },
      { label: '2009 / 2552', value: '2009' },
      { label: '2008 / 2551', value: '2008' },
      { label: '2007 / 2550', value: '2007' },
      { label: '2006 / 2549', value: '2006' },
      { label: '2005 / 2548', value: '2005' },
      { label: '2004 / 2547', value: '2004' },
      { label: '2003 / 2546', value: '2003' },
    ],
  },
  dynamic_fetch: 'car',
  dynamic_fetch_groups: ['car'],
  placeholder: 'Select manufacturing year',
  type: 'singlechoice',
  annotations: {
    'rf/buttons-per-row': '1',
    'rf/only-dropdown': '',
    'rf/singlechoice-dropdown': 'only',
    'rf/tip-text':
      'Please select the year the car was manufactured. You can enter Thai or regular year formats. In case you are not sure when your car was manufactured, check your car registration document.',
    'rf/translation-label': 'motor:questions.labels.year',
    'rf/translation-placeholder': 'motor:questions.placeholders.year',
    'rf/translation-tooltip': 'motor:questions.tooltips.year',
  },
};

describe('transform the single question', () => {
  it('transform the single question with only single buttons and no dropdown', () => {
    const transformedQuestion = transformSingleChoice(
      questionModel
    );
    expect(transformedQuestion).toEqual(
      expect.objectContaining({
        type: 'combo_radio_select',
      })
    );
    expect(transformedQuestion.singleChoices.length).toEqual(3);
    expect(transformedQuestion.selectOptions.length).toEqual(0);
    expect(transformedQuestion.singleChoices).toEqual([
      {
        label:
          'Mazda 2 2015 __motor:questions.choices.submodel.placeholders.october__ __motor:questions.choices.submodel.placeholders.petrol__ 1.50 __motor:questions.choices.submodel.placeholders.manual__ 4 __motor:questions.choices.submodel.placeholders.doors__ Elegance Sedan',
        value: '7656',
      },
      {
        label:
          'Mazda 2 2015 __motor:questions.choices.submodel.placeholders.october__ __motor:questions.choices.submodel.placeholders.petrol__ 1.50 __motor:questions.choices.submodel.placeholders.manual__ 4 __motor:questions.choices.submodel.placeholders.doors__ Sports Hatchback',
        value: '7629',
      },
      {
        jumpTo: 'car_brand',
        label: 'motor:questions.choices.submodel.change_my_car',
        value: 'jumpTo_car_brand',
      },
    ]);
  });
});

describe('transform the single question', () => {
  it('transform the single question with dropdown only', () => {
    const transformedQuestion = transformSingleChoice(
      questionYear
    );
    expect(transformedQuestion).toEqual(
      expect.objectContaining({
        type: 'combo_radio_select',
      })
    );
    expect(transformedQuestion.singleChoices.length).toEqual(0);
    expect(transformedQuestion.selectOptions.length).toEqual(19); // include placeholder item
  });
});
