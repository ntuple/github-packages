import React from 'react';
import useTranslation from 'next-translate/useTranslation';

const NextButton = ({
  isDisabled,
  isVisible,
  onClick,
  isConfirmButton,
  children,
}) => {
  const { t } = useTranslation();

  return (
    <button
      style={{
        display: isVisible ? 'block' : 'none',
      }}
      type="button"
      className="btn btn-primary text-uppercase btn-lg btn-block"
      onClick={onClick}
      disabled={isDisabled}
    >
      {children ||
        (isConfirmButton
          ? t('common:buttons.confirm')
          : t('common:buttons.next'))}
    </button>
  );
};

export default NextButton;
