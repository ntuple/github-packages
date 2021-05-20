import { useTranslation } from 'next-translate';
import TextFieldLayout from './TextFieldLayout';

const SimpleText = ({
  question,
  handleNextButton,
  isConfirmButton,
  formik,
}) => {
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
          id={`${question.code}`}
          type="text"
          className={`
                 form-control
                 ${
                   formik.touched[question.code] &&
                   (!formik.errors[question.code] ? 'is-valid' : 'is-invalid')
                 }
               `}
          aria-describedby=""
          placeholder={t(`${question.translations.placeholder}`)}
          onKeyDown={handleKeyDown}
          {...formik.getFieldProps(question.code)}
        />
      )}
    </TextFieldLayout>
  );
};

export default SimpleText;
