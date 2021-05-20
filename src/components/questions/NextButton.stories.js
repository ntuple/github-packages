import React from 'react';
import { action } from '@storybook/addon-actions';
import NextButton from './NextButton';

export default {
  component: NextButton,
  title: 'NextButton',
};

export const enabled = () => <NextButton isVisible={true} />;
export const disabled = () => <NextButton isDisabled isVisible={true} />;
export const customText = () => (
  <NextButton isVisible={true}>This is Custom</NextButton>
);
export const onClick = () => (
  <NextButton isVisible={true} onClick={action('Clicked!')}>
    Click for Action
  </NextButton>
);
