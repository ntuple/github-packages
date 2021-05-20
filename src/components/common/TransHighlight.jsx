import React from 'react';
import { Trans, useTranslation } from 'next-translate';
import { isObject } from '../../lib/object';
import { isString } from '../../lib/string';
import RecommendIcon from '../../public/icons/common/recommend.svg';

const TransHighlight = ({ i18nKey, values }) => {
  const { t } = useTranslation();

  const translatedValues = {};
  if (isObject(values)) {
    Object.keys(values).forEach((key) => {
      if (isString(values[key])) {
        translatedValues[key] = t(values[key]);
      } else {
        translatedValues[key] = values[key];
      }
    });
  }

  return (
    <Trans
      i18nKey={i18nKey}
      components={[
        <span key="current" style={{ fontWeight: 500 }} />,
        <span key="black" style={{ color: '#555555', fontWeight: 500 }} />,
        <span key="green" style={{ color: '#21c794', fontWeight: 500 }} />,
        <span key="red" style={{ color: '#e60012', fontWeight: 500 }} />,
        // eslint-disable-next-line react/jsx-key
        <br />,
        // eslint-disable-next-line react/jsx-key
        <RecommendIcon className="ml-1 mb-1" />,
      ]}
      values={translatedValues}
    />
  );
};

export default TransHighlight;
