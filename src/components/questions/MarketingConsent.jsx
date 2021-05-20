import React, { useEffect, useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { Trans } from 'next-translate';
import QuestionContainer from './QuestionContainer';
import LoadingSpinner from '../common/LoadingSpinner';

const MarketingConsent = ({
  question,
  active,
  onSubmit,
  value,
  onChange,
  eventQuestionDisplay,
  i18nNamespace,
  privacyPolicyLinks,
  termsAndConditionsLinks,
}) => {
  const { t, lang } = useTranslation();
  const progressBarSize = 65;
  const [eventFired, setEventFired] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const offset = (el) => {
    const rect = el.getBoundingClientRect();
    const scrollLeft =
      window.pageXOffset || document.documentElement.scrollLeft;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
  };

  useEffect(() => {
    if (!eventFired && active) {
      eventQuestionDisplay('terms', 'marketing_consent');
      setEventFired(true);
    }
  }, [eventFired, active]);

  const handleConsentClick = (value) => {
    const $btnMarketingConsent = document.getElementById(
      'btn-marketing-consent'
    );
    window.scrollTo({
      top: offset($btnMarketingConsent).top - progressBarSize,
      behavior: 'smooth',
    });
    onChange(question.code, value);
  };

  const handleShowQuoteClick = () => {
    setIsSubmitting(true);
    onSubmit();
  };

  return (
    <QuestionContainer
      id={question.code}
      hasBorderBottom={false}
      active={active}
    >
      <div className="row">
        <div className="col-12">
          <div className="mx-auto text-justify" style={{ maxWidth: '760px' }}>
            <Trans
              i18nKey={`${i18nNamespace}:terms_conditions.html_top`}
              /* eslint-disable-next-line react/jsx-key */
              components={[
                <p />,
                <p style={{ textIndent: '2rem' }} />,
                <strong />,
                <a
                  style={{ textDecoration: 'underline' }}
                  href={privacyPolicyLinks[lang]}
                  target="_blank"
                  rel="noreferrer"
                />,
              ]}
            />
            <div className="row justify-content-md-center">
              <div className="col-6 col-md-4">
                <div className="form-check mb-4 mt-2">
                  <input
                    id={`${question.code}-1`}
                    className="form-check-input"
                    type="radio"
                    name={question.code}
                    onChange={() => handleConsentClick('1')}
                    value="1"
                    checked={value === '1'}
                  />
                  <label
                    className="form-check-label w-100 rounded d-flex align-items-center justify-content-center"
                    htmlFor={`${question.code}-1`}
                    role="button"
                  >
                    {t(`${i18nNamespace}:terms_conditions.choices.accept`)}
                  </label>
                </div>
              </div>
              <div className="col-6 col-md-4">
                <div className="form-check mb-4 mt-2">
                  <input
                    id={`${question.code}-0`}
                    className="form-check-input"
                    type="radio"
                    name={question.code}
                    onChange={() => handleConsentClick('0')}
                    value="0"
                    checked={value === '0'}
                  />
                  <label
                    className="form-check-label w-100 rounded d-flex align-items-center justify-content-center"
                    htmlFor={`${question.code}-0`}
                    role="button"
                  >
                    {t(`${i18nNamespace}:terms_conditions.choices.decline`)}
                  </label>
                </div>
              </div>
            </div>
            <div>
              <Trans
                i18nKey={`${i18nNamespace}:terms_conditions.html_bottom`}
                /* eslint-disable-next-line react/jsx-key */
                components={[
                  <p />,
                  <a
                    style={{ textDecoration: 'underline' }}
                    href={privacyPolicyLinks[lang]}
                    target="_blank"
                    rel="noreferrer"
                  />,
                  <a
                    style={{ textDecoration: 'underline' }}
                    href={termsAndConditionsLinks[lang]}
                    target="_blank"
                    rel="noreferrer"
                  />,
                ]}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-4 offset-lg-4">
        {isSubmitting ? (
          <LoadingSpinner small />
        ) : (
          <button
            type="button"
            className="btn btn-lg btn-primary text-uppercase btn-block mt-2"
            onClick={handleShowQuoteClick}
            disabled={value === null}
            id="btn-marketing-consent"
          >
            {t('common:buttons.show_quotes')}
          </button>
        )}
      </div>
    </QuestionContainer>
  );
};

export default MarketingConsent;
