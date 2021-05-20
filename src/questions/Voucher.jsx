import HelpTool from '../common/HelpTool';
import NextButton from './NextButton';
import React from 'react';
import useTranslation from 'next-translate/useTranslation';

const Voucher = ({ code, value, error, tipText, onChange, onSubmit }) => {
  const { t } = useTranslation();
  let validClass = '';
  let errorMessage = null;

  if (value) {
    validClass = !error && value ? 'is-valid' : 'is-invalid';
  }

  if (value && error) {
    errorMessage = t('common:validation.invalid_voucher', { value: value });
    value = '';
  }

  return (
    <>
      <div className="form-group">
        <div className="row">
          <div className="col-lg question-label">
            <label htmlFor={code}>{t('common:checkout.questions.labels.voucher')}</label>
            {tipText && <HelpTool tip={tipText} />}
          </div>
          <div className="col-lg">
            <input
              id={code}
              type="text"
              className={`form-control ${validClass}`}
              onChange={onChange}
              value={value}
              placeholder={t('common:checkout.questions.placeholders.voucher')}
            />
            <div className="invalid-feedback">{errorMessage}</div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12 text-right col-lg-3 offset-lg-9">
          <NextButton isVisible={true} onClick={() => onSubmit(value)}>
            {value
              ? t('common:checkout.confirm_coupon')
              : t('common:buttons.skip')}
          </NextButton>
        </div>
      </div>
    </>
  );
};

export default Voucher;
