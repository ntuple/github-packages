import React from 'react';
import MultiTextFields from './MultiTextFields';
import { action } from '@storybook/addon-actions';

export default {
  component: MultiTextFields,
  title: 'components/questions/MultiTextFields',
};

export const DefaultView = () => {
  const question = {
    code: 'customer_first_name',
    section: 'driver',
    type: 'multi_question',
    questions: [
      {
        code: 'customer_first_name',
        label: 'motor:questions.labels.first_name',
        order: 1,
        placeholder: 'motor:questions.placeholders.first_name',
        section: 'driver',
        tipText: 'motor:questions.tooltips.first_name',
        translations: {
          label: 'motor:questions.labels.first_name',
          placeholder: 'motor:questions.placeholders.first_name',
          tooltip: 'motor:questions.tooltips.first_name',
        },
        type: 'text',
        validation: { rule: 'name', min: 0, max: 40 },
      },
      {
        code: 'customer_last_name',
        label: 'motor:questions.labels.last_name',
        order: 2,
        placeholder: 'motor:questions.placeholders.last_name',
        section: 'driver',
        tipText: 'motor:questions.tooltips.last_name',
        translations: {
          label: 'motor:questions.labels.last_name',
          placeholder: 'motor:questions.placeholders.last_name',
          tooltip: 'motor:questions.tooltips.last_name',
        },
        type: 'text',
        validation: { rule: 'name', min: 0, max: 40 },
      },
      {
        buttonsPerRow: '2',
        choiceTranslation: null,
        code: 'car_province',
        label: 'motor:questions.labels.province',
        order: 3,
        placeholder: 'motor:questions.placeholders.province',
        section: 'car',
        singleChoices: [
          {
            label: 'motor:questions.choices.province.3',
            value: '3',
          },
          {
            label: 'motor:questions.choices.province.36',
            value: '36',
          },
          {
            label: 'motor:questions.choices.province.37',
            value: '37',
          },
          {
            label: 'motor:questions.choices.province.48',
            value: '48',
          },
          {
            label: 'motor:questions.choices.province.57',
            value: '57',
          },
          {
            label: 'motor:questions.choices.province.58',
            value: '58',
          },
        ],
        selectOptions: [
          {
            label: 'motor:questions.placeholders.province',
          },
          {
            label: 'motor:questions.choices.province.0',
            value: '0',
          },
          {
            label: 'motor:questions.choices.province.1',
            value: '1',
          },
          {
            label: 'motor:questions.choices.province.2',
            value: '2',
          },
          {
            label: 'motor:questions.choices.province.3',
            value: '3',
          },
          {
            label: 'motor:questions.choices.province.4',
            value: '4',
          },
          {
            label: 'motor:questions.choices.province.36',
            value: '36',
          },
          {
            label: 'motor:questions.choices.province.37',
            value: '37',
          },
          {
            label: 'motor:questions.choices.province.48',
            value: '48',
          },
          {
            label: 'motor:questions.choices.province.57',
            value: '57',
          },
          {
            label: 'motor:questions.choices.province.58',
            value: '58',
          },
        ],
        tipText: 'motor:questions.tooltips.province',
        translations: {
          label: 'motor:questions.labels.province',
          placeholder: 'can i get',
          tooltip: 'motor:questions.tooltips.province',
          choicePrefix: 'motor:questions.choices.province.',
        },
        type: 'combo_radio_select',
        validation: {},
      },
    ],
  };
  const formik = {
    values: {},
    touched: {},
    errors: {},
    handleBlur: action('Blur'),
    getFieldProps: action('name'),
    handleChange: action('Value Change'),
  };
  return (
    <MultiTextFields
      formik={formik}
      name={question.name}
      handleNextButton={action('Next Button Clicked')}
      questions={question.questions}
    />
  );
};

export const condtionalView = () => {
  const question = {
    code: 'car_driving_purpose',
    section: 'driver',
    type: 'multi_question',
    questions: [
      {
        code: 'car_driving_purpose',
        buttonsPerRow: 2,
        label: 'motor:questions.labels.purpose',
        order: 1,
        section: 'driver',
        tipText: 'motor:questions.tooltips.purpose',
        dynamic: {
          dependants: ['car'],
          group: 'car',
        },
        type: 'combo_radio_select',
        translations: {
          choicePrefix: 'motor:questions.choices.purpose.',
          label: 'motor:questions.labels.purpose',
          tooltip: 'motor:questions.tooltips.purpose',
          translatePlaceholders: false,
        },
        validation: {},
        selectOptions: [],
        singleChoices: [
          {
            label: 'motor:questions.choices.purpose.Personal',
            value: 'Personal',
          },
          {
            label: 'motor:questions.choices.purpose.Commercial',
            value: 'Commercial',
          },
        ],
      },
      {
        code: 'customer_first_name',
        label: 'motor:questions.labels.first_name',
        order: 2,
        placeholder: 'motor:questions.placeholders.first_name',
        section: 'driver',
        tipText: 'motor:questions.tooltips.first_name',
        translations: {
          label: 'motor:questions.labels.first_name',
          placeholder: 'motor:questions.placeholders.first_name',
          tooltip: 'motor:questions.tooltips.first_name',
        },
        type: 'text',
        validation: { rule: 'name', min: 0, max: 40 },
        displayCondition: 'car_driving_purpose == "personal"',
      },
      {
        code: 'customer_last_name',
        label: 'motor:questions.labels.last_name',
        order: 3,
        placeholder: 'motor:questions.placeholders.last_name',
        section: 'driver',
        tipText: 'motor:questions.tooltips.last_name',
        translations: {
          label: 'motor:questions.labels.last_name',
          placeholder: 'motor:questions.placeholders.last_name',
          tooltip: 'motor:questions.tooltips.last_name',
        },
        type: 'text',
        validation: { rule: 'name', min: 0, max: 40 },
        displayCondition: 'car_driving_purpose == "personal"',
      },
      {
        buttonsPerRow: '2',
        choiceTranslation: null,
        code: 'car_province',
        label: 'motor:questions.labels.province',
        order: 4,
        placeholder: 'motor:questions.placeholders.province',
        section: 'car',
        displayCondition: 'car_driving_purpose == "Commercial"',
        singleChoices: [
          {
            label: 'motor:questions.choices.province.3',
            value: '3',
          },
          {
            label: 'motor:questions.choices.province.36',
            value: '36',
          },
          {
            label: 'motor:questions.choices.province.37',
            value: '37',
          },
          {
            label: 'motor:questions.choices.province.48',
            value: '48',
          },
          {
            label: 'motor:questions.choices.province.57',
            value: '57',
          },
          {
            label: 'motor:questions.choices.province.58',
            value: '58',
          },
        ],
        selectOptions: [
          {
            label: 'motor:questions.placeholders.province',
          },
          {
            label: 'motor:questions.choices.province.0',
            value: '0',
          },
          {
            label: 'motor:questions.choices.province.1',
            value: '1',
          },
          {
            label: 'motor:questions.choices.province.2',
            value: '2',
          },
          {
            label: 'motor:questions.choices.province.3',
            value: '3',
          },
          {
            label: 'motor:questions.choices.province.4',
            value: '4',
          },
          {
            label: 'motor:questions.choices.province.36',
            value: '36',
          },
          {
            label: 'motor:questions.choices.province.37',
            value: '37',
          },
          {
            label: 'motor:questions.choices.province.48',
            value: '48',
          },
          {
            label: 'motor:questions.choices.province.57',
            value: '57',
          },
          {
            label: 'motor:questions.choices.province.58',
            value: '58',
          },
        ],
        tipText: 'motor:questions.tooltips.province',
        translations: {
          label: 'motor:questions.labels.province',
          placeholder: 'can i get',
          tooltip: 'motor:questions.tooltips.province',
          choicePrefix: 'motor:questions.choices.province.',
        },
        type: 'combo_radio_select',
        validation: {},
      },
    ],
  };

  const formik = {
    values: {
      car_driving_purpose: 'Personal',
      customer_first_name: '',
      customer_last_name: '',
      car_province: '',
    },
    touched: {
      car_driving_purpose: '',
      customer_first_name: '',
      customer_last_name: '',
      car_province: '',
    },
    errors: {},
    handleBlur: action('Blur'),
    getFieldProps: action('name'),
    handleChange: (e) => {
      formik.values['car_driving_purpose'] = e.currentTarget.value;
    },
  };
  return (
    <MultiTextFields
      formik={formik}
      name={question.name}
      handleNextButton={action('Next Button Clicked')}
      questions={question.questions}
    />
  );
};
