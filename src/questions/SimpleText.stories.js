import React from 'react';
import { action } from '@storybook/addon-actions';
import SimpleText from './SimpleText';

export default {
  component: SimpleText,
  title: 'components/questions/SimpleText',
};

export const standard = () => {
  const question = {
    code: 'coupon_code',
    order: 1,
    section: 'driver',
    label: 'motor:questions.labels.coupon_code',
    validation: { rule: 'text', min: 0, max: 255 },
    tipText: 'motor:questions.tooltips.coupon_code',
    translations: {
      translatePlaceholders: true,
      label: 'motor:questions.labels.coupon_code',
      placeholder: 'motor:questions.placeholders.coupon_code',
      tooltip: 'motor:questions.tooltips.coupon_code',
    },
    type: 'text',
    placeholder: 'motor:questions.placeholders.coupon_code',
  };

  const formik = {
    getFieldProps: () => {},
    values: {},
    touched: {},
    errors: {},
    handleBlur: action('Blured'),
    handleChange: action('Value Change'),
  };
  return (
    <SimpleText
      formik={formik}
      question={question}
      handleNextButton={action('Next Button Clicked')}
    />
  );
};
