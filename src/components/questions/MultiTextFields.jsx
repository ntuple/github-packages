import React, { useEffect, useState } from 'react';
import { evaluateCondition } from '../../lib/util';
import NextButton from './NextButton';
import TextField from './TextField';
import ComboRadioSelectBox from './ComboRadioSelectBox';

const MultiTextFields = ({
  formik,
  name,
  handleNextButton,
  questions,
  onDynamicQuestionChange,
  isConfirmButton,
}) => {
  let isNextButtonDisabled = false;
  const [values, setValues] = useState(formik.values);
  const [firstItem, setFirstItem] = useState(questions[0]);
  const [childQuestions, setChildQuestions] = useState([]);
  const [dependents, setDependents] = useState([]);
  const getChildQuestions = (code, value) => {
    return questions.filter((q) => {
      return (
        q.validation &&
        q.validation.requiredIf &&
        q.validation.requiredIf.field == code &&
        q.validation.requiredIf.value == value
      );
    });
  };

  // Check if button disabled
  questions.forEach((question) => {
    if (formik.errors[question.code]) {
      isNextButtonDisabled = true;
    }
  });

  const handleDynamic = (nextQnIndex, field, value) => {
    if (nextQnIndex >= questions.length) return; // index out of bound
    if (questions[nextQnIndex].dynamic) {
      const nextQnCode = questions[nextQnIndex].code;

      // Get dependency questions in the same dynamic group
      const dependencyQuestions = [];
      for (let i = nextQnIndex; i < questions.length; i++) {
        if (!questions[i].dynamic) {
          break;
        }
        dependencyQuestions.push(questions[i].code);
      }
      setDependents(dependencyQuestions);
      if (value > 0) {
        onDynamicQuestionChange(nextQnCode, field, value, dependencyQuestions);
      }
    }
  };

  const answers = questions.map((question) => {
    return formik.values[question.code];
  });
  const [showButton, setShowButton] = useState(true);

  const handleChange = (field, e) => {
    setValues({
      ...values,
      [field]: e.currentTarget.value,
    });
    formik.handleChange(e);
  };
  const handleButton = () => {
    handleNextButton(name, answers);
    setShowButton(false);
  };
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      if (!isNextButtonDisabled) {
        handleButton();
      }
    }
  };

  useEffect(() => {
    if (!showButton) {
      setShowButton(true);
    }
  }, [values]);

  useEffect(() => {
    if (firstItem.singleChoices && firstItem.singleChoices.length) {
      const dependents = getChildQuestions(
        firstItem.code,
        formik.values[firstItem.code]
      );
      setShowButton(dependents.length);
    }
  }, [childQuestions]);

  useEffect(() => {
    if (questions && questions.length) {
      setFirstItem(questions[0]);
    }
  }, [questions]);

  const checkChildQuestions = (current, value) => {
    let childQuestions = [];
    if (current.singleChoices && current.singleChoices.length) {
      childQuestions = getChildQuestions(current.code, value);
    }
    setChildQuestions(childQuestions);
    if (!childQuestions.length) {
      handleButton();
    }
  };

  return (
    <>
      {questions.map((question, index) => {
        let result = true;
        const handleChangeForSingleChoice = (e) => {
          handleChange(question.code, e);
          handleDynamic(index + 1, question.code, e.target.value);
          if (question.singleChoices.length) {
            checkChildQuestions(question, e.currentTarget.value);
          }
        };
        const validClass =
          formik.touched[question.code] &&
          (!formik.errors[question.code] ? 'is-valid' : 'is-invalid');
        if (question.displayCondition) {
          result = evaluateCondition(question, formik);
        }
        {
          switch (question.type) {
            case 'text':
              return (
                <TextField
                  isVisible={result}
                  key={question.code}
                  formik={formik}
                  question={question}
                  handleChange={handleChange}
                  handleKeyDown={handleKeyDown}
                  validClass={validClass}
                />
              );
            case 'combo_radio_select':
              return (
                <div
                  className="form-group"
                  key={question.code}
                  style={{
                    display: result ? 'block' : 'none',
                  }}
                >
                  <ComboRadioSelectBox
                    key={question.code}
                    formik={formik}
                    handleChange={handleChangeForSingleChoice}
                    fieldName={question.code}
                    label={question.label}
                    buttonsPerRow={question.buttonsPerRow}
                    singleChoices={question.singleChoices}
                    selectOptions={question.selectOptions}
                    sortOrder={question.sortLabels}
                    tip={question.tipText}
                    translations={question.translations}
                    defaultValue={question.defaultValue}
                    dependents={dependents}
                    onClick={handleChangeForSingleChoice}
                  />
                </div>
              );
            default:
          }
        }
      })}
      <div className="row">
        <div className="col-12 text-right col-lg-3 text-right offset-lg-9">
          <NextButton
            isVisible={showButton}
            onClick={handleButton}
            isDisabled={isNextButtonDisabled}
            isConfirmButton={isConfirmButton}
          />
        </div>
      </div>
    </>
  );
};

export default MultiTextFields;
