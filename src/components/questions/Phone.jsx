import useTranslation from 'next-translate/useTranslation';
import TextFieldLayout from './TextFieldLayout';

const Phone = ({
  formik,
  handleChange,
  question,
  handleNextButton,
  isConfirmButton,
}) => {
  const onChange = (event) => {
    let value = event.target.value;
    event.target.value = value.replace(/[^\d]/g, '');
    handleChange(event);
  };

  const { t } = useTranslation();
  return (
    <TextFieldLayout
      tip={question.tipText}
      label={t(question.label)}
      questionCode={question.code}
      handleNextButton={handleNextButton}
      isConfirmButton={isConfirmButton}
      formik={formik}
    >
      {(handleKeyDown) => (
        <input
          type="tel"
          maxLength="10"
          className={`
            form-control
            ${
              formik.touched[question.code]
                ? !formik.errors[question.code]
                  ? 'is-valid'
                  : 'is-invalid'
                : ''
            }
          `}
          name={question.code}
          onChange={onChange}
          onBlur={onChange}
          onKeyDown={handleKeyDown}
          value={formik.values[question.code]}
          placeholder={t('common:placeholders.phone')}
        />
      )}
    </TextFieldLayout>
  );
};

export default Phone;
