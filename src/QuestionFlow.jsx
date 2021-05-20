import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { produce } from 'immer';
import useTranslation from 'next-translate/useTranslation';
import {
  getDefaultAnswer,
  getFollowingQuestions,
  getNextQuestion,
  getNextSection,
  isEndOfSection,
  getQuestionPosition,
} from 'lib/questions';
import MarketingConsent from './questions/MarketingConsent';
import Question from './questions/Question';

const QuestionFlow = ({
  initialValues,
  initialConfig,
  initialQuestionsVisibility,
  initialSectionsVisibility,
  initialFurthestQuestion,
  onAnswer,
  onSubmit,
  onConfigUpdate,
  validationSchema,
  getDynamicChoiceQuestionPatch,
  i18nNamespace,
  onShowQuestion = null,
  scrollToMarketingConsent = false,
  showConfirm = false,
  showSectionHeader = false,
  lastStage = null,
  privacyPolicyUrl = null,
  termsAndConditionsUrl = null,
  eventQuestionDisplay = () => {},
}) => {
  const { t } = useTranslation();
  const [furthestQuestion, setFurthestQuestion] = useState(
    initialFurthestQuestion
  );
  const [questionsVisibility, setQuestionsVisibility] = useState(
    initialQuestionsVisibility
  );
  const [sectionsVisibility, setSectionsVisibility] = useState(
    initialSectionsVisibility
  );
  const [config, setConfig] = useState(initialConfig);
  const progressBarSize = 65;

  useEffect(() => {
    onConfigUpdate(config);
  }, [config, onConfigUpdate]);

  const offset = (el) => {
    const rect = el.getBoundingClientRect();
    const scrollLeft =
      window.pageXOffset || document.documentElement.scrollLeft;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
  };

  useEffect(() => {
    const $marketConsent = document.getElementById('tc');
    if (scrollToMarketingConsent) {
      setTimeout(() => {
        window.scrollTo({
          top: offset($marketConsent).top - progressBarSize,
          behavior: 'smooth',
        });
      }, 100);
    }
  }, [scrollToMarketingConsent]);

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
  });

  /**
   * @param {string} field - field name.
   * @param value
   */
  const setFieldValue = (field, value) => {
    // For some reason we can't put setFieldValue() before setFieldTouched(),validate on change won't working properly.
    formik.setFieldTouched(field);
    formik.setFieldValue(field, value);
  };

  /**
   * Reset field value
   *
   * @param {array} fields
   */
  const resetFieldsValue = (fields) => {
    fields.forEach((field) => {
      formik.setFieldValue(field, '');
    });
  };

  const handleDependencies = (question, furthestQuestion, config) => {
    let hideQuestions = [];
    if (!question) {
      return hideQuestions;
    }

    if (
      getQuestionPosition(furthestQuestion, config) >
      getQuestionPosition(question.code, config)
    ) {
      if (question.dynamic) {
        hideQuestions = getFollowingQuestions(question, config.sections);
        resetFieldsValue(hideQuestions);
      }
    }

    if (isEndOfSection(question, config.sections)) {
      const nextSectionsVisibility = produce(
        sectionsVisibility,
        (draftState) => {
          draftState[getNextSection(question.section, config.sections)] = true;
        }
      );

      setSectionsVisibility(nextSectionsVisibility);
    }

    return hideQuestions;
  };

  /**
   * Show next question and scrolling user to next question.
   *
   * @param {array} showFields
   * @param {array} hideFields
   */
  const handleQuestionsVisibility = (showFields = [], hideFields = []) => {
    const updateQuestionsVisibility = { ...questionsVisibility };

    hideFields.forEach((field) => {
      updateQuestionsVisibility[field] = false;
    });

    showFields.forEach((field) => {
      updateQuestionsVisibility[field] = true;
    });

    setQuestionsVisibility(updateQuestionsVisibility);
  };

  const handleNextQuestion = async (
    questionConfig,
    prevQuestion,
    questionCode,
    furthestQuestion,
    values,
    skipQuestions = {}
  ) => {
    if (
      getQuestionPosition(furthestQuestion, config) <
      getQuestionPosition(questionCode, config)
    ) {
      furthestQuestion = questionCode;
    }

    if (questionConfig.questions[questionCode].dynamic) {
      const {
        shouldSkipNextQuestion,
        questionConfig: newQuestionConfig,
      } = await getDynamicChoiceQuestionPatch(questionCode, values);

      questionConfig = newQuestionConfig;

      if (shouldSkipNextQuestion) {
        values[questionCode] = getDefaultAnswer(
          questionCode,
          questionConfig.questions
        );
        skipQuestions[questionCode] = values[questionCode];

        const nQuestion = getNextQuestion(
          questionCode,
          questionConfig.questionOrder,
          questionConfig.questions
        );

        if (nQuestion) {
          return handleNextQuestion(
            questionConfig,
            questionCode,
            nQuestion,
            furthestQuestion,
            values,
            skipQuestions
          );
        }
      }
    }

    setConfig(questionConfig);
    setFurthestQuestion(furthestQuestion);

    const hideQuestions = handleDependencies(
      questionConfig.questions[prevQuestion],
      furthestQuestion,
      questionConfig
    );

    // Set formik values and hide skip questions.
    Object.keys(skipQuestions).forEach((skipQuestion) => {
      setFieldValue(skipQuestion, skipQuestions[skipQuestion]);
      hideQuestions.push(skipQuestion);
    });

    handleQuestionsVisibility([questionCode], hideQuestions);
    if (onShowQuestion !== null && questionCode !== null) {
      onShowQuestion(config.questions[questionCode]);
    }

    const $nextQuestionBlock = document.getElementById(questionCode);
    // Navigate user to next question
    if ($nextQuestionBlock) {
      setTimeout(() => {
        window.scrollTo({
          top: offset($nextQuestionBlock).top - progressBarSize,
          behavior: 'smooth',
        });
      }, 100);
    }
  };

  const handleNewAnswer = async (questionCode, answer) => {
    const nextQuestion = getNextQuestion(
      questionCode,
      config.questionOrder,
      config.questions
    );

    const values = {
      ...formik.values,
    };
    if (config.questions[questionCode].type === 'multi_question') {
      config.questions[questionCode].questions.forEach((question, index) => {
        values[question.code] = answer[index];
      });
    } else {
      values[questionCode] = answer;
    }

    onAnswer(questionCode, values);

    if (nextQuestion) {
      handleNextQuestion(
        config,
        questionCode,
        nextQuestion,
        furthestQuestion,
        values
      );
    }
  };

  const dynamicChoicesFetch = (
    nextQnCode,
    field,
    value,
    dependencyQuestions
  ) => {
    const formikValues = {
      ...formik.values,
      [field]: value,
    };
    getDynamicChoiceQuestionPatch(nextQnCode, formikValues).then(
      ({ questionConfig: newQuestionConfig }) => {
        setConfig(newQuestionConfig);
      }
    );

    resetFieldsValue(dependencyQuestions);
  };

  useEffect(() => {
    formik.validateForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [validationSchema]);

  const handleChange = (field, value) => {
    const question = config.questions[field];

    setFieldValue(field, value);

    if (
      !['email', 'phone', 'text', 'square_checkboxes'].includes(question.type)
    ) {
      handleNewAnswer(field, value);
    }
  };

  const handleSubmit = () => {
    // Send user back to answer missing question.
    // Tc question value is not stored in formik value and submit button activation depends on its value,
    // so it's safely ignored from formik validation.
    formik.validateForm().then((errors) => {
      for (const questionCode of config.questionOrder) {
        if (errors[questionCode] && questionCode !== 'tc') {
          const $errorQuestionBlock = document.getElementById(questionCode);
          formik.setFieldTouched(questionCode);

          window.scrollTo({
            top: offset($errorQuestionBlock).top - progressBarSize,
          });

          break;
        }
      }

      if (!Object.keys(errors).length) {
        onSubmit(formik.values);
      }
    });
  };

  return (
    <form>
      {Object.keys(config.sections).map((sectionName, index) => {
        // @todo remove this hack, we need to make sure 'tc' field does not appear in Quotes section
        if (sectionName === 'quotes') {
          return '';
        }

        const section = config.sections[sectionName];
        return (
          <div
            key={sectionName}
            className="form-section rounded mb-md-5 position-relative"
            style={{
              display: sectionsVisibility[sectionName] ? 'block' : 'none',
            }}
          >
            <h2 className="text-primary h3 form-section-header d-none d-lg-block">
              {t(`${i18nNamespace}:sections.labels.${sectionName}`)}
            </h2>

            {showSectionHeader && index === 0 && (
              <h3 className="px-2 mobile-form-section-header d-md-none d-lg-none">
                {t(`${i18nNamespace}:sections.labels.${sectionName}`)}
              </h3>
            )}

            {lastStage === 'confirm' && index === 0 && showConfirm && (
              <p
                className="pt-0 px-2 pt-lg-4 px-lg-5 mb-0"
                style={{ color: '#768dac' }}
              >
                {t(`${i18nNamespace}:sections.labelDetail.${sectionName}`)}
              </p>
            )}

            {section.questions.map((questionName, questionIndex) => {
              const question = config.questions[questionName];
              const bgColor = questionIndex % 2 ? 'bg-question' : '';
              // make first question visible
              const active = questionsVisibility[questionName];

              return (
                <Question
                  key={question.code}
                  active={active}
                  bgColor={bgColor}
                  isConfirmButton={showConfirm}
                  handleChange={handleChange}
                  handleNewAnswer={handleNewAnswer}
                  onDynamicQuestionChange={dynamicChoicesFetch}
                  question={question}
                  formik={formik}
                  eventQuestionDisplay={eventQuestionDisplay}
                />
              );
            })}
          </div>
        );
      })}
      {config.questions.tc ? (
        <MarketingConsent
          active={questionsVisibility.tc}
          key="tc"
          value={formik.values.tc || null}
          question={config.questions.tc}
          onChange={setFieldValue}
          onSubmit={handleSubmit}
          eventQuestionDisplay={eventQuestionDisplay}
          i18nNamespace={i18nNamespace}
          privacyPolicyLinks={privacyPolicyUrl}
          termsAndConditionsLinks={termsAndConditionsUrl}
        />
      ) : (
        ''
      )}
    </form>
  );
};

export default QuestionFlow;
