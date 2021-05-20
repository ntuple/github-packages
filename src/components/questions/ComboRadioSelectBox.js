import React, { useEffect, useState } from 'react';
import { Trans } from 'next-translate';
import useTranslation from 'next-translate/useTranslation';
import Image from '../Image';
import HelpTool from '../common/HelpTool';
import useSingleChoiceSorter from '../hooks/useSingleChoiceSorter';
import ErrorMessage from './ErrorMessage';

const ComboRadioSelectBox = ({
  label,
  fieldName,
  buttonsPerRow,
  singleChoices,
  selectOptions,
  formik,
  handleChange,
  sortOrder,
  translations,
  tip,
  defaultValue,
  dependents = [],
  onClick = null,
}) => {
  const { t } = useTranslation();
  const { sortChoices } = useSingleChoiceSorter();
  const [isDisabled, setIsDisabled] = useState(null);
  // Pair required column layout with Bootstrap’s grid system
  const gridColumns = {
    4: 'col-3',
    3: 'col-4',
    2: 'col-6',
    1: 'col-12',
  };

  let transLabel = label;
  if (translations.label) {
    transLabel = translations.label;
  }

  const errorMessage =
    formik.errors[fieldName] && formik.touched[fieldName]
      ? formik.errors[fieldName]
      : '';

  const translatePlaceholders = (choiceLabel) => {
    return choiceLabel.replace(/__\S+__/g, (match) =>
      t(match.replace(/__/g, ''))
    );
  };

  useEffect(() => {
    if (
      !singleChoices.length &&
      selectOptions &&
      selectOptions.length &&
      (typeof formik.values[fieldName] == 'undefined' ||
        formik.values[fieldName] == 0 ||
        formik.values[fieldName] == null) &&
      (selectOptions[1].value == 0 || selectOptions[1].value == '0')
    ) {
      setIsDisabled(true);
    }
  }, [singleChoices, selectOptions, formik, fieldName]);

  useEffect(() => {
    if (defaultValue && formik?.values && !formik.values[fieldName]) {
      formik.values[fieldName] = defaultValue;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValue]);

  useEffect(() => {
    if (dependents && dependents.length && dependents.includes(fieldName)) {
      setIsDisabled(true);
    }
  }, [dependents, fieldName]);

  useEffect(() => {
    if (dependents && dependents.length && dependents[0] === fieldName) {
      setIsDisabled(false);
    }
  }, [selectOptions, dependents, fieldName]);

  return (
    <div className="row" id={fieldName}>
      <div className="col-lg question-label">
        <label htmlFor={fieldName}>{t(transLabel)}</label>
        {tip && <HelpTool tip={t(tip)} />}
      </div>
      <div className="col-lg">
        <div className="row">
          {singleChoices.map((option) => (
            <div
              key={`${fieldName}-${option.value}`}
              className={`d-flex ${gridColumns[buttonsPerRow]}`}
            >
              <div className="form-check mb-2 d-flex flex-fill mb-lg-3">
                {option.jumpTo ? (
                  <a
                    className="jump-to form-check-label w-100 rounded text-center font-weight-normal px-2 py-3 d-block text-decoration-none"
                    href={`#${option.jumpTo}`}
                  >
                    {t(option.label)}
                  </a>
                ) : (
                  <>
                    <input
                      id={`${fieldName}-${option.value}`}
                      className="form-check-input"
                      type="radio"
                      {...formik.getFieldProps(fieldName)}
                      onChange={handleChange}
                      onBlur={handleChange}
                      value={option.value}
                      onClick={onClick}
                      checked={formik.values[fieldName] == option.value}
                    />
                    <label
                      className="form-check-label d-flex flex-fill justify-content-center flex-column align-items-center rounded text-center font-weight-normal px-2 py-3"
                      htmlFor={`${fieldName}-${option.value}`}
                      role="button"
                    >
                      {option.image && (
                        <div className="radio-image mb-2 d-flex align-items-center text-center">
                          <Image
                            className="mx-auto img-fluid"
                            {...option.image}
                            style={{ height: '40px' }}
                          />
                        </div>
                      )}

                      {option.icon && (
                        <div className="radio-image mb-1 d-flex align-items-center text-center">
                          <Image
                            className="mx-auto image-icon img-fluid"
                            {...option.icon}
                          />
                        </div>
                      )}
                      {option.iconText && (
                        <div className="text-icon mb-1">{option.iconText}</div>
                      )}
                      {translations.choiceTemplate ? (
                        <Trans
                          i18nKey={translations.choiceTemplate}
                          components={[
                            <span
                              key={option.value}
                              style={{
                                color: '#97AAC3',
                                fontSize: '18px',
                                fontWeight: 700,
                              }}
                            />,
                          ]}
                          values={{ value: option.label }}
                        />
                      ) : translations.translatePlaceholders ? (
                        translatePlaceholders(option.label)
                      ) : (
                        t(option.label)
                      )}
                    </label>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {selectOptions && selectOptions.length > 0 && (
          <select
            disabled={isDisabled}
            className="form-control"
            {...formik.getFieldProps(fieldName)}
            onChange={handleChange}
          >
            {sortChoices(selectOptions, sortOrder).map((option) => (
              <option
                key={`${fieldName}-${option.value}}`}
                value={option.value}
                style={{ display: option.isPlaceHolder && 'none' }}
              >
                {t(option.label)}
              </option>
            ))}
          </select>
        )}
        <ErrorMessage message={errorMessage} />
      </div>
    </div>
  );
};

export default ComboRadioSelectBox;
