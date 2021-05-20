import React from 'react';
import { action } from '@storybook/addon-actions';
import Date from './Date';

export default {
  component: Date,
  title: 'components/questions/Date',
};

export const enabled = () => {
  const question = {
    code: 'policy_start',
    order: 19,
    section: 'insurance',
    label: 'motor:questions.labels.policy_start',
    validation: { rule: 'date', from_days: 0, to_days: 183 },
    tipText: 'motor:questions.tooltips.policy_start',
    translations: {
      label: 'motor:questions.labels.policy_start',
      tooltip: 'motor:questions.tooltips.policy_start',
    },
    type: 'date',
    placeholder: 'DD / MM / YYYY',
    presets: [
      {
        label: 'Today',
        delta_days: 0,
        annotations: {
          'rf/translation-string': 'motor:questions.date.presets.today',
        },
        dateStr: '23/07/2020',
      },
      {
        label: 'This week',
        delta_days: 4,
        annotations: {
          'rf/translation-string': 'motor:questions.date.presets.next_week',
        },
        dateStr: '27/07/2020',
      },
      {
        label: "I don't know yet",
        delta_days: null,
        annotations: {
          'rf/translation-string': 'motor:questions.date.presets.i_dont_know',
        },
      },
    ],
  };
  const formik = {
    values: {},
    touched: {},
    errors: {},
    handleBlur: action('Blur'),
    handleChange: action('Value Change'),
  };
  return (
    <Date
      formik={formik}
      question={question}
      handleNextButton={action('Next Button Clicked')}
    />
  );
};
