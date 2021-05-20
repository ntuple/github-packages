import React from 'react';
import ExclamationIcon from '../../public/icons/common/exclamation-triangle.svg';
import { isObject } from '../../lib/object';
import useTranslation from 'next-translate/useTranslation';

const ErrorMessage = ({ message }) => {
  const { t } = useTranslation();

  if (!message) {
    return '';
  }

  return (
    <div className="invalid-feedback" style={{ display: 'block' }}>
      <ExclamationIcon className="mr-1" />
      {isObject(message) ? t(message.key, message.values) : t(message)}
    </div>
  );
};

export default ErrorMessage;
