import React from 'react';
import { action } from '@storybook/addon-actions';
import Checklist from '.';

export default {
  component: Checklist,
  title: 'components/questions/Checklist',
};

export const standard = () => {
  const formik = {
    values: {
      health_condition: [],
      other: 'hide',
    },
    touched: {},
    errors: {},
    handleBlur: action('Blur'),
    handleChange: action('Value Change'),
  };
  const question = {
    code: 'customer_health',
    type: 'checklist',
    title: 'health:questions.labels.customer_health',
    checkboxes: [
      {
        value: 1,
        label: 'health:questions.checkboxes.customer_health.1.label',
      },
      {
        value: 2,
        label: 'health:questions.checkboxes.customer_health.2.label',
      },
      {
        value: 3,
        label: 'health:questions.checkboxes.customer_health.3.label',
      },
      {
        value: 4,
        label: 'health:questions.checkboxes.customer_health.4.label',
      },
      {
        value: 5,
        label: 'health:questions.checkboxes.customer_health.5.label',
      },
    ],
  };
  const onSubmit = (fieldName, selectedValues) => {
    console.log(fieldName, selectedValues, 'from checkbox');
  };
  return (
    <Checklist
      formik={formik}
      checkboxes={question.checkboxes}
      label={question.title}
      fieldName={question.code}
      onSubmit={onSubmit}
      handleNextButton={action('Next Button Clicked')}
    />
  );
};
