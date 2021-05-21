import React, { useEffect, useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { evaluateCondition } from '../../../lib/util';
import NextButton from '../NextButton';
import ChecklistItem from './Item';
import styles from './Checklist.module.scss';

const Checklist = ({
  formik,
  checkboxes,
  fieldName,
  onSubmit = null,
  handleNextButton,
  label,
}) => {
  const { t } = useTranslation();

  const [values, setValues] = useState({});
  const [selectedValues, setSelectedValues] = useState([]);
  const [showButton, setShowButton] = useState(true);

  const filteredCheckboxes = checkboxes.filter((item) => {
    if (!item.displayCondition) {
      return true;
    }
    return evaluateCondition(item, formik);
  });

  useEffect(() => {
    const initialValues = filteredCheckboxes.reduce(
      (currentValues, checkbox) => {
        return {
          ...currentValues,
          [checkbox.value]: formik.values[fieldName]
            ? formik.values[fieldName].includes(checkbox.value)
            : checkbox.isPreSelected,
        };
      },
      {}
    );

    const checkboxValues = [];
    for (const [ivKey, ivValue] of Object.entries(initialValues)) {
      if (
        ivValue &&
        filteredCheckboxes.some((CBKey) => CBKey?.value === ivKey)
      ) {
        checkboxValues.push(ivKey);
      }
    }

    setSelectedValues(checkboxValues);
    setValues(initialValues);
  }, []);

  const handleValueChange = (value) => {
    values[value] = !values[value];
    const selected = [];
    Object.entries(values).forEach(([key, value]) => {
      value && selected.push(key);
    });
    if (onSubmit) {
      onSubmit(fieldName, selected);
    }
    setSelectedValues(selected);
    setShowButton(true);
  };

  const handleNextOnClick = () => {
    setShowButton(false);
    handleNextButton(fieldName, selectedValues);
  };

  return (
    <div className={`${styles.checklist}`}>
      <div className={`${styles.checklist__section} mx-auto row`}>
        <div
          className={`${styles['checklist__section__question-label']} question-label text-left mx-2 col-lg-12`}
        >
          <label>{t(label)}</label>
        </div>
        {checkboxes.map((item, index) => {
          if (item.displayCondition && !evaluateCondition(item, formik)) {
            return '';
          }

          return (
            <ChecklistItem
              item={item}
              key={index}
              isChecked={values[index + 1]}
              onChange={() => handleValueChange(item.value)}
            />
          );
        })}
      </div>
      <div className="col-lg-4 offset-lg-4">
        <NextButton
          isDisabled={false}
          isVisible={showButton}
          onClick={handleNextOnClick}
        >
          {t('health:questions.labels.confirm')}
        </NextButton>
      </div>
    </div>
  );
};

export default Checklist;
