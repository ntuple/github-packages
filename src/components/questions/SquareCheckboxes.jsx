import React, { useEffect, useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import HelpTool from '../common/HelpTool';
import NextButton from './NextButton';
import ErrorMessage from './ErrorMessage';

const SquareCheckboxes = ({
  formik,
  checkboxes,
  fieldName,
  onSubmit,
  handleNextButton,
  label,
  tip,
  isConfirmButton,
}) => {
  const { t } = useTranslation();

  const [showButton, setShowButton] = useState(true);
  const [values, setValues] = useState({}); // Object representing Checkbox name and their state [true / false]
  const [selectedValues, setSelectedValues] = useState([]); // List of selected Checkbox value

  useEffect(() => {
    const initialValues = checkboxes.reduce((currentValues, checkbox) => {
      return {
        ...currentValues,
        [checkbox.value]: formik.values[fieldName]
          ? formik.values[fieldName].includes(checkbox.value)
          : false,
      };
    }, {});

    setValues(initialValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkboxes]);

  const handleNextClick = () => {
    handleNextButton(fieldName, selectedValues);
    setShowButton(false);
  };

  /**
   * @param {*} cbValue // checkbox value
   */
  const handleCbValueChange = (cbValue) => {
    // toggle cbValue
    values[cbValue] = !values[cbValue];

    const selected = [];
    Object.entries(values).forEach(([key, value]) => {
      value && selected.push(key);
    });
    onSubmit(fieldName, selected);
    setSelectedValues(selected);
    setValues(values);

    setShowButton(true);
  };

  const errorMessage =
    formik.errors[fieldName] && formik.touched[fieldName]
      ? formik.errors[fieldName]
      : '';

  return (
    <div className="row">
      <div className="col-lg-12 question-label mb-2">
        <label>{t(label)}</label>
        {tip && <HelpTool tip={t(tip)} />}
      </div>
      <div className="col-12">
        <div className="row">
          {checkboxes.map((checkbox, index) => (
            <div className="col-lg-6 d-flex" key={index}>
              <div className="form-check mt-2 mb-3 d-flex">
                <input
                  id={checkbox.value}
                  type="checkbox"
                  {...formik.getFieldProps(fieldName)}
                  onChange={() => handleCbValueChange(checkbox.value)}
                  checked={values[checkbox.value]}
                />
                <label
                  className="form-check-label rounded p-3 font-weight-normal"
                  htmlFor={checkbox.value}
                  role="button"
                >
                  <span className="icon-check p-1" />
                  <h5>
                    {t(checkbox.label)}
                    {checkbox.iconTitle && (
                      <span
                        className={`${checkbox.iconTitle} ml-2 text-success`}
                      />
                    )}
                  </h5>
                  {t(checkbox.title)}
                  <p className="text-muted mt-2">{t(checkbox.desc)}</p>
                </label>
              </div>
            </div>
          ))}

          <div className="col-12">
            <ErrorMessage message={errorMessage} />
          </div>
        </div>
        <div className="row">
          <div className="col-12 text-right col-lg-3 text-right offset-lg-9">
            <NextButton
              isVisible={showButton}
              isConfirmButton={isConfirmButton}
              onClick={handleNextClick}
              isDisabled={formik.errors[fieldName]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SquareCheckboxes;
