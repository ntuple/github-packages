import useTranslation from 'next-translate/useTranslation';
import HelpTool from '../common/HelpTool';
import ErrorMessage from './ErrorMessage';

const TextField = ({
  isVisible,
  formik,
  handleChange,
  handleKeyDown,
  question,
  validClass,
}) => {
  const { t } = useTranslation();

  const errorMessage =
    formik.errors[question.code] && formik.touched[question.code]
      ? formik.errors[question.code]
      : '';

  return (
    <div
      key={question.code}
      id={question.code}
      style={{
        display: isVisible ? 'block' : 'none',
      }}
      className="form-group"
    >
      <div className="row">
        <div className="col-lg question-label">
          <label htmlFor={question.code}>{t(question.label)}</label>
          {question.tipText && <HelpTool tip={t(question.tipText)} />}
        </div>
        <div className="col-lg">
          <input
            type="text"
            className={`form-control ${validClass}`}
            placeholder={t(question.placeholder)}
            {...formik.getFieldProps(question.code)}
            onChange={(e) => handleChange(question.code, e)}
            onKeyDown={handleKeyDown}
          />
          <ErrorMessage message={errorMessage} />
        </div>
      </div>
    </div>
  );
};

export default TextField;
