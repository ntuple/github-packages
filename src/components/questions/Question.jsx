import React, { useEffect, useState } from 'react';
import ComboRadioSelectBox from './ComboRadioSelectBox';
import Phone from './Phone';
import Email from './Email';
import MultiTextFields from './MultiTextFields';
import SquareCheckboxes from './SquareCheckboxes';
import QuestionContainer from './QuestionContainer';
import Date from './Date';
import SimpleText from './SimpleText';
import Checklist from './Checklist';

const Question = ({
  bgColor = '',
  active = false,
  hasBorderBottom = true,
  question,
  isConfirmButton,
  handleChange,
  handleNewAnswer,
  formik,
  onDynamicQuestionChange,
  eventQuestionDisplay,
}) => {
  const baseProps = {
    fieldName: question.code,
    handleChange: (e) => handleChange(question.code, e.currentTarget.value),
    handleNextButton: (field, value) => handleNewAnswer(field, value),
    formik,
    isConfirmButton,
  };
  const [eventFired, setEventFired] = useState(false);
  const isError = formik.errors[question.code] && formik.touched[question.code];

  useEffect(() => {
    if (!eventFired && active) {
      eventQuestionDisplay(question.section, question.code);
      setEventFired(true);
    }
  }, [eventFired, active]);

  const questionComponent = ((question) => {
    switch (question.type) {
      case 'combo_radio_select':
        return (
          <ComboRadioSelectBox
            {...baseProps}
            label={question.label}
            buttonsPerRow={question.buttonsPerRow}
            singleChoices={question.singleChoices}
            selectOptions={question.selectOptions}
            sortOrder={question.sortLabels ? question.sortLabels : null}
            choiceTranslation={question.choiceTranslation}
            tip={question.tipText}
            translations={question.translations}
          />
        );
      case 'phone':
        return <Phone {...baseProps} question={question} />;
      case 'email':
        return <Email {...baseProps} question={question} />;
      case 'text':
        return <SimpleText {...baseProps} question={question} />;
      case 'multi_question':
        return (
          <MultiTextFields
            {...baseProps}
            name={question.code}
            questions={question.questions}
            onDynamicQuestionChange={onDynamicQuestionChange}
          />
        );
      case 'date':
        return <Date {...baseProps} question={question} />;
      case 'square_checkboxes':
        return (
          <SquareCheckboxes
            {...baseProps}
            label={question.label}
            checkboxes={question.checkboxes}
            tip={question.tipText}
            onSubmit={(field, value) => handleChange(field, value)}
          />
        );
      case 'checklist':
        return (
          <Checklist
            {...baseProps}
            label={question.label}
            checkboxes={question.checkboxes}
          />
        );
      default:
    }
  })(question);

  return (
    <QuestionContainer
      key={question.code}
      id={question.code}
      isError={isError}
      bgColor={bgColor}
      active={active}
      question={question}
      hasBorderBottom={hasBorderBottom}
    >
      {questionComponent}
    </QuestionContainer>
  );
};

export default Question;
