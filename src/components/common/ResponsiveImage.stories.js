import React from 'react';
import { withKnobs, text } from '@storybook/addon-knobs';
import ResponsiveImage from './ResponsiveImage';

export default {
  component: ResponsiveImage,
  title: 'ResponsiveImage',
  decorators: [withKnobs],
};

export const standard = () => (
  <ResponsiveImage
    srcSet={text('Default Image Url', 'http://placeimg.com/900/180/arch')}
    mobileSrcSet={text('Mobile Image Url', 'http://placeimg.com/767/180/arch')}
    className="img-fluid"
    alt={text('Image Alt', 'Lorem ipsum dolor sit amet')}
  />
);
