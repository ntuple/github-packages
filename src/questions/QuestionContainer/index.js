import React, { useEffect } from 'react';
import { useTranslation } from 'next-translate';

import screenSize from '../../../lib/constants/screenSize';
import { localizedString } from '../../../lib/translation';
import ResponsiveImage from '../../common/ResponsiveImage';

import styles from './QuestionContainer.module.scss';

const QuestionContainer = ({
  bgColor = '',
  active = true,
  hasBorderBottom = true,
  id = null,
  question = {},
  isError,
  children,
}) => {
  const { lang } = useTranslation();
  const { bannerPosition, bannerSrcset, bannerMobileSrcset = '' } = question;

  const banner = (className, srcSet, mobileSrcSet = '') => {
    if (!srcSet) {
      return '';
    }

    return (
      <ResponsiveImage
        className={className}
        alt="Banner"
        srcSet={localizedString(srcSet, lang)}
        mobileSrcSet={mobileSrcSet ? localizedString(mobileSrcSet, lang) : null}
      />
    );
  };

  useEffect(() => {
    // run after .from-block appears in dom"
    if (window.innerWidth <= screenSize.SMALL) {
      let formBlocks = document.getElementsByClassName('form-block');
      [...formBlocks].forEach((formBlock) => {
        // eslint-disable-next-line prettier/prettier
        formBlock.style.minHeight = (window.innerHeight - 65) + 'px';
      });
    }
  }, []);

  return (
    <div
      className={isError ? `${styles['error']}` : ''}
      style={active ? {} : { display: 'none' }}
    >
      {bannerPosition === 'outside-top' &&
        banner('img-fluid w-100', bannerSrcset, bannerMobileSrcset)}
      <div
        id={id}
        className={`form-block py-5 px-2 py-lg-4 px-lg-5 ${bgColor} ${
          !hasBorderBottom ? 'border-bottom-0' : ''
        }`}
      >
        {bannerPosition === 'inside-top' &&
          banner('img-fluid w-m-100 mb-3', bannerSrcset, bannerMobileSrcset)}
        {children}
        {bannerPosition === 'inside-bottom' &&
          banner('img-fluid w-m-100 mt-3', bannerSrcset, bannerMobileSrcset)}
      </div>
      {bannerPosition === 'outside-bottom' &&
        banner('img-fluid w-100', bannerSrcset, bannerMobileSrcset)}
    </div>
  );
};

export default QuestionContainer;
