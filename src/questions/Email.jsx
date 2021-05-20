import useTranslation from 'next-translate/useTranslation';
import TextFieldLayout from './TextFieldLayout';

const Email = ({ formik, handleNextButton, question, isConfirmButton }) => {
  const { t } = useTranslation();

  return (
    <TextFieldLayout
      tip={question.tipText}
      label={t(question.label)}
      questionCode={question.code}
      handleNextButton={handleNextButton}
      formik={formik}
      isConfirmButton={isConfirmButton}
    >
      {(handleKeyDown) => (
        <input
          id="email"
          type="email"
          className={`
                 form-control
                 ${
                   formik.touched[question.code] &&
                   (!formik.errors[question.code] ? 'is-valid' : 'is-invalid')
                 }
               `}
          aria-describedby="emailHelp"
          placeholder={t('common:placeholders.email')}
          onKeyDown={handleKeyDown}
          {...formik.getFieldProps(question.code)}
        />
      )}
    </TextFieldLayout>
  );
};

export default Email;
