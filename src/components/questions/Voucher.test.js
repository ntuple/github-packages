import { render, screen } from '@testing-library/react';
import { expect, test, jest } from '@jest/globals';
import '@testing-library/jest-dom/extend-expect';
import Voucher from './Voucher';

const defaultProps = {
  code: 'voucher',
  tipText: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
  placeholder: 'Voucher',
  onSubmit: jest.fn(),
  onChange: jest.fn(),
};

test('renders Voucher component', () => {
  const testLabel = 'common:checkout.questions.labels.voucher';

  render(<Voucher {...defaultProps} value="" error={false} />);
  expect(screen.getByText(testLabel)).toBeInTheDocument();
});

test('shows skip button, when the input is empty', () => {
  render(<Voucher {...defaultProps} value="" error={false} />);
  expect(screen.getByText('common:buttons.skip')).toBeEnabled();
});

test('shows skip button, when there is an error', () => {
  render(<Voucher {...defaultProps} value="invalid code" error={true} />);

  expect(screen.getByText('common:buttons.skip')).toBeEnabled();
});

test('shows confirm CTA button', () => {
  render(<Voucher {...defaultProps} value="coupon code" error={false} />);

  expect(screen.getByText('common:checkout.confirm_coupon')).toBeEnabled();
});
