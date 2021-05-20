import React, {
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
} from 'react';
import useTranslation from 'next-translate/useTranslation';
import HelpTool from '../common/HelpTool';
import NextButton from './NextButton';
import ErrorMessage from './ErrorMessage';

// Use forwardRef and useImperativeHandle because we need to trigger hiding the
// button from parent component. Not happy with it, but best we can do for now
const TextFieldLayout = forwardRef(
  (
    {
      formik,
      label,
      tip,
      children,
      questionCode,
      handleNextButton,
      isConfirmButton,
    },
    ref
  ) => {
    const { t } = useTranslation();
    const [showButton, setShowButton] = useState(true);
    const [submittedValue, setSubmittedValue] = useState(null);
    const handleButton = () => {
      handleNextButton(questionCode, formik.values[questionCode]);
      setSubmittedValue(formik.values[questionCode]);
      setShowButton(false);
    };
    const formikValue = formik.values[questionCode];

    useImperativeHandle(ref, () => ({
      clickNext: () => {
        handleButton();
      },
    }));

    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        if (!formik.errors[questionCode]) {
          handleButton();
        }
      }
    };

    useEffect(() => {
      if (!showButton && formikValue !== submittedValue) {
        setShowButton(true);
      }
    }, [formikValue, submittedValue]);

    const errorMessage =
      formik.errors[questionCode] && formik.touched[questionCode]
        ? formik.errors[questionCode]
        : '';

    return (
      <>
        <div className="form-group">
          <div className="row">
            <div className="col-lg question-label">
              <label htmlFor={questionCode}>{label}</label>
              {tip && <HelpTool tip={t(tip)} />}
            </div>
            <div className="col-lg">
              {children(handleKeyDown)}
              <ErrorMessage message={errorMessage} />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12 text-right col-lg-3 offset-lg-9">
            <NextButton
              isConfirmButton={isConfirmButton}
              isVisible={showButton}
              onClick={() => handleButton()}
              isDisabled={formik.errors[questionCode]}
            />
          </div>
        </div>
      </>
    );
  }
);

export default TextFieldLayout;
