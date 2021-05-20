import React from 'react';
import { action } from '@storybook/addon-actions';
import Voucher from './Voucher';
import { withKnobs, text } from '@storybook/addon-knobs';

export default {
  component: Voucher,
  title: 'components/questions/Voucher',
  decorators: [
    (Story) => (
      <div className="text-left">
        <Story />
      </div>
    ),
    withKnobs,
  ],
};

const defaultProps = {
  code: 'voucher',
  onSubmit: action('On Submit'),
  onChange: action('On Change'),
};

export const defaultView = () => (
  <>
    <Voucher
      {...defaultProps}
      tipText={text(
        'Tooltip',
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. yeah'
      )}
      value=""
      error={false}
    />
  </>
);

export const withValidCouponCode = () => (
  <Voucher
    {...defaultProps}
    tipText={text(
      'Tooltip',
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. yeah'
    )}
    value="VALID COUPON"
    error={false}
  />
);

export const withError = () => (
  <Voucher
    {...defaultProps}
    tipText={text(
      'Tooltip',
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. yeah'
    )}
    value={text('Invalid Code', 'TESTCODE')}
    error={true}
  />
);
