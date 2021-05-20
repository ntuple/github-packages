import React from 'react';
import { withKnobs, text, radios } from '@storybook/addon-knobs';

import QuestionContainer from '.';

export default {
  component: QuestionContainer,
  title: 'QuestionContainer',
  decorators: [withKnobs],
};

const Container = ({ children }) => (
  <div className="container">
    <div className="row justify-content-center">
      <div className="col-12 col-lg-9 py-5">{children}</div>
    </div>
  </div>
);

export const withBanner = () => {
  const question = {
    bannerPosition: radios(
      'BannerPosition',
      {
        'outside top': 'outside-top',
        'outside bottom': 'outside-bottom',
        'inside top': 'inside-top',
        'inside bottom': 'inside-bottom',
      },
      'outside-top'
    ),
    bannerSrcset: text('Banner Image Url', 'http://placeimg.com/900/180/arch'),
    bannerMobileSrcset: text(
      'Mobile Banner Image Url',
      'http://placeimg.com/767/180/arch'
    ),
  };
  return (
    <Container>
      <QuestionContainer question={question}>
        <div className="alert alert-success" role="alert">
          Question Block
        </div>
      </QuestionContainer>
    </Container>
  );
};
