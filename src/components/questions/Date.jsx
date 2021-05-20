import { useEffect, useRef, useState } from 'react';
import moment from 'moment';
import useTranslation from 'next-translate/useTranslation';
import DateCleavedInput from './DateCleavedInput';
import TextFieldLayout from './TextFieldLayout';

const Date = ({ formik, handleNextButton, question, isConfirmButton }) => {
  const { t } = useTranslation();
  const [presets, setPresets] = useState([]);
  const [selected, setSelected] = useState('');

  useEffect(() => {
    if (formik.values[question.code]) {
      setSelected(formik.values[question.code]);
    } else if (
      formik &&
      Object.keys(formik.values).length > 0 &&
      (formik.values[question.code] === undefined ||
        formik.values[question.code] === '')
    ) {
      setSelected(undefined);
    }
  }, []);

  useEffect(() => {
    let presets = question.presets || [];
    presets.forEach((preset) => {
      if (preset.delta_days == null) {
        preset.dateStr = undefined;
      } else {
        preset.dateStr = moment()
          .add(parseInt(preset.delta_days), 'days')
          .format('DD/MM/YYYY');
      }
    });
    setPresets(presets);
  }, [question]);

  const textFieldRef = useRef();
  const handlePresetClick = (event) => {
    const { value } = event.target;
    setSelected(value || null);
    formik.values[question.code] = value;
    textFieldRef.current.clickNext();
  };

  const handleTextInputFocus = (event) => {
    event.preventDefault();
    setSelected('');
  };

  return (
    <TextFieldLayout
      tip={question.tipText}
      label={t(question.label)}
      questionCode={question.code}
      handleNextButton={handleNextButton}
      formik={formik}
      ref={textFieldRef}
      isConfirmButton={isConfirmButton}
    >
      {(handleKeyDown) => (
        <>
          <DateCleavedInput
            id={question.code}
            name={question.code}
            placeholder={t('common:placeholders.date')}
            formik={formik}
            onFocus={handleTextInputFocus}
            handleKeyDown={handleKeyDown}
          />

          {question.button && (
            <div className="form-check mt-2">
              <input
                id={question.button.label}
                className="form-check-input"
                type="radio"
                name={question.code}
                onChange={formik.handleChange}
                value="no"
                checked={formik.values[question.code] === 'no'}
              />
              <label
                className="form-check-label w-100 rounded text-center font-weight-normal px-2 py-3"
                htmlFor={question.button.label}
                role="button"
              >
                {question.button.label}
              </label>
            </div>
          )}

          {presets.map((presetDate, index) => {
            const id = `key_${index}`;
            return (
              <div key={id} className="form-check">
                <input
                  id={id}
                  className="form-check-input"
                  type="radio"
                  checked={presetDate.dateStr == selected}
                  value={presetDate.dateStr}
                  onClick={handlePresetClick}
                />
                <label
                  className="form-check-label d-flex flex-fill justify-content-center flex-column align-items-center rounded text-center font-weight-normal px-2 py-3 my-2"
                  htmlFor={id}
                  role="button"
                >
                  {t(presetDate.annotations['rf/translation-string'])}
                </label>
              </div>
            );
          })}
        </>
      )}
    </TextFieldLayout>
  );
};

export default Date;
