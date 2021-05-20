import {
  parseAnnotations,
  transformMultipleQuestions,
  transformQuestion,
} from './questionTypeTransformer';
import { describe, expect, it } from '@jest/globals';
import { findMultiQuestions } from '../questions';

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

const car_engine_description = {
  order: 6,
  title: 'What is the engine size?',
  dynamic_fetch: 'car',
  dynamic_fetch_groups: ['car'],
  type: 'singlechoice',
  annotations: {
    'rf/buttons-per-row': '4',
    'rf/tip-text':
      "Please select the engine size of your car. The engine size for cars running on fuel, diesel or CNG is depicted in liter (L). Electric vehicles' engine size is depicted in kilowats (KW). In case you are not sure what your car's engine size is, check your car registration document.",
    'rf/translation-choice-template':
      'motor:questions.choices.enginedescription',
    'rf/translation-label': 'motor:questions.labels.enginedescription',
    'rf/translation-tooltip': 'motor:questions.tooltips.enginedescription',
  },
};

const sectionMap = [
  'customer',
  'customer',
  'customer',
  'customer_email',
  'contact_address',
  'contact_address',
  'contact_address',
];

const questionTypes = {
  customer_gender: {
    order: 1,
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
  },
  customer_dob: {
    order: 2,
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
  customer_email: {
    order: 3,
    title: 'What is your email?',
    placeholder: 'Ex: example@gmail.com',
    type: 'editbox',
    validation: {
      rule: 'email',
    },
    annotations: {
      'rf/tip-text':
        'Submit your correct Email so we can send you important document about your car insurance.',
      'rf/translation-label': 'motor:questions.labels.email',
      'rf/translation-placeholder': 'motor:questions.placeholders.email',
      'rf/translation-tooltip': 'motor:questions.tooltips.email',
    },
  },
  insurance_voluntary: {
    order: 4,
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
  },
  health_condition: {
    order: 5,
    title: 'I here by confirm that',
    type: 'multichoice',
    multichoice: {
      choices: [
        {
          label:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam faucibus sodales consequat. Integer vel dui orci. Ut ac malesuada felis. Mauris eu turpis viverra, malesuada tellus vitae, rutrum augue. Donec ultricies sit amet eros eu finibus. Vestibulum vel hendrerit lectus. Etiam laoreet lorem eu metus facilisis malesuada. Praesent tempus magna id ex pulvinar, ut aliquet nisi volutpat. Nunc id porta augue, a tincidunt sapien. Etiam cursus velit ipsum, rhoncus egestas ligula venenatis ac. Nullam lobortis elit eu neque lacinia, et convallis mauris fringilla. Mauris eleifend turpis euismod suscipit placerat. Suspendisse imperdiet elementum ante, id sagittis nulla interdum ut. Nunc venenatis consequat massa, vitae sodales purus efficitur non. Integer at condimentum arcu, eget rutrum orci. Sed convallis nisi leo, a fermentum libero accumsan at.',
          value: 'type 1',
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
          label:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam faucibus sodales consequat. Integer vel dui orci. Ut ac malesuada felis. Mauris eu turpis viverra, malesuada tellus vitae, rutrum augue. Donec ultricies sit amet eros eu finibus. Vestibulum vel hendrerit lectus. Etiam laoreet lorem eu metus facilisis malesuada. Praesent tempus magna id ex pulvinar, ut aliquet nisi volutpat. Nunc id porta augue, a tincidunt sapien. Etiam cursus velit ipsum, rhoncus egestas ligula venenatis ac. Nullam lobortis elit eu neque lacinia, et convallis mauris fringilla. Mauris eleifend turpis euismod suscipit placerat. Suspendisse imperdiet elementum ante, id sagittis nulla interdum ut. Nunc venenatis consequat massa, vitae sodales purus efficitur non. Integer at condimentum arcu, eget rutrum orci. Sed convallis nisi leo, a fermentum libero accumsan at.',
          value: 'type 2',
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
      'rf/checklist': true,
      'rf/tip-text':
        'We have several voluntary insurance types for you to compare and purchase, depending on your coverage needs and budget. Please select each insurance type you would like to compare on the quote page.',
      'rf/translation-label': 'motor:questions.labels.insurance_voluntary',
      'rf/translation-tooltip': 'motor:questions.tooltips.insurance_voluntary',
    },
  },
};

const typeSectionMap = ['', 'customer', 'customer', 'customer', 'car', 'car'];

describe('parse annotation of question', () => {
  it('return the transformed annotaion of question according to annotation of question', () => {
    expect(parseAnnotations(car_engine_description.annotations)).toEqual({
      buttonsPerRow: '4',
      tipText:
        "Please select the engine size of your car. The engine size for cars running on fuel, diesel or CNG is depicted in liter (L). Electric vehicles' engine size is depicted in kilowats (KW). In case you are not sure what your car's engine size is, check your car registration document.",
      translations: {
        translatePlaceholders: false,
        choiceTemplate: 'motor:questions.choices.enginedescription',
        label: 'motor:questions.labels.enginedescription',
        tooltip: 'motor:questions.tooltips.enginedescription',
      },
    });
  });
});


describe('transform the multiple question', () => {
  it('transform the multiple question', () => {
    const { multiQuestions } = findMultiQuestions(questions, questionOrder);
    const transformedQuestion = transformMultipleQuestions(
      multiQuestions['customer_name'],
      sectionMap
    );
    expect(transformedQuestion).toEqual(
      expect.objectContaining({
        code: 'customer_name',
        section: 'customer',
        type: 'multi_question',
      })
    );
    expect(transformedQuestion.questions.length).toEqual(4);
  });
});

describe('transform question for each question type', () => {
  it('return text as type based on edit box type', () => {
    expect(
      transformQuestion(
        'customer_email',
        questionTypes.customer_email,
        typeSectionMap
      )
    ).toEqual({
      type: 'email',
      placeholder: 'motor:questions.placeholders.email',
      code: 'customer_email',
      label: 'motor:questions.labels.email',
      order: 3,
      section: 'customer',
      tipText: 'motor:questions.tooltips.email',
      translations: {
        label: 'motor:questions.labels.email',
        placeholder: 'motor:questions.placeholders.email',
        tooltip: 'motor:questions.tooltips.email',
        translatePlaceholders: false,
      },
      validation: {
        rule: 'email',
      },
    });
  });

  it('return date as type', () => {
    expect(
      transformQuestion(
        'customer_dob',
        questionTypes.customer_dob,
        typeSectionMap
      )
    ).toEqual({
      code: 'customer_dob',
      label: 'motor:questions.labels.dob',
      order: 2,
      section: 'customer',
      tipText: 'motor:questions.tooltips.dob',
      translations: {
        label: 'motor:questions.labels.dob',
        tooltip: 'motor:questions.tooltips.dob',
        translatePlaceholders: false,
      },
      type: 'date',
      validation: {
        rule: 'dob',
      },
    });
  });

  it('return single choice as type', () => {
    let question = transformQuestion(
      'customer_gender',
      questionTypes.customer_gender,
      typeSectionMap
    );
    expect(question).toEqual(
      expect.objectContaining({
        code: 'customer_gender',
        label: 'motor:questions.labels.gender',
        order: 1,
        section: 'customer',
        tipText: 'motor:questions.tooltips.gender',
        type: 'combo_radio_select',
        validation: {},
      })
    );
    expect(question.selectOptions.length).toEqual(0);
    expect(question.singleChoices.length).toEqual(2);
  });

  it('return multichoice as type', () => {
    let question = transformQuestion(
      'insurance_voluntonary',
      questionTypes.insurance_voluntary,
      typeSectionMap
    );
    expect(question).toEqual(
      expect.objectContaining({
        type: 'square_checkboxes',
      })
    );
    expect(question.checkboxes).toEqual(expectedCheckboxes);
    expect(question.checkboxes.length).toEqual(2);
  });

  it('return multichoice as type', () => {
    let question = transformQuestion(
      'health_condition',
      questionTypes.health_condition,
      typeSectionMap
    );
    expect(question).toEqual(
      expect.objectContaining({
        type: 'checklist',
      })
    );
  });
});

