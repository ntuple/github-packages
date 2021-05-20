import React from 'react';
import { useTranslation } from 'next-translate';
import styles from '../Checklist.module.scss';

const ChecklistItem = ({ item, onChange, isChecked = false }) => {
  const { t } = useTranslation();
  return (
    <div
      className={`${styles['checklist__form-check']} row`}
      style={{ width: '100%' }}
    >
      <div
        className={`${styles['checklist__custom-control']} col-12 custom-control custom-checkbox`}
      >
        <input
          type="checkbox"
          id={item.value}
          onClick={onChange}
          checked={isChecked}
          className={`${styles['checklist__form-check-input']} custom-control-input`}
        />
        <label
          className={`${styles['checklist__form-check-label']} custom-control-label`}
          htmlFor={item.value}
        >
          {t(item.label)}
        </label>
      </div>
    </div>
  );
};
export default ChecklistItem;
