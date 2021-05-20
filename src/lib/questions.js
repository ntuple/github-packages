import { normalizeDate } from './date';
import { isKeySet } from './object';

export const findMultiQuestions = (questions, questionOrder) => {
  const skipQuestions = [];
  const multiQuestions = {};
  let currentMulti = null;
  questionOrder.forEach((key) => {
    const question = questions[key];
    const nextOnSamePage = isKeySet(
      question.annotations,
      'rf/show-next-on-same-page'
    );
    if (!currentMulti) {
      if (!nextOnSamePage) {
        return;
      }
      multiQuestions[key] = {
        [key]: question,
      };
      currentMulti = key;
      return;
    }
    multiQuestions[currentMulti][key] = question;
    skipQuestions.push(key);
    if (!nextOnSamePage) {
      currentMulti = null;
    }
  });
  return {
    multiQuestions,
    skipQuestions,
  };
};

export const getDefaultAnswer = (code, questions) => {
  const question = questions[code];

  // If skipQuestion is defined then return it's value
  if (Object.keys(question).includes('skipQuestion')) {
    return question.skipQuestion;
  }

  if (
    question.type === 'combo_radio_select' &&
    question.singleChoices.length === 1
  ) {
    return question.singleChoices[0].value;
  }

  return null;
};

export const getNextQuestion = (question, questionOrder, questions) => {
  let position = questionOrder.indexOf(question);

  if (questions[question].type === 'multi_question') {
    position += questions[question].questions.length;
  } else {
    position += 1;
  }

  if (position > questionOrder.length) {
    return null;
  }

  return questionOrder[position];
};

export const shouldSkipQuestion = (code, questions) => {
  const question = questions[code];

  if (!question) {
    return false;
  }

  // Skip if explicitly told to
  if (Object.keys(question).includes('skipQuestion')) {
    return true;
  }

  // Skip if Radio Select with only 1 choice available
  return (
    question.type === 'combo_radio_select' &&
    question.singleChoices.length === 1
  );
};

export const getNextSection = (section, sections) => {
  const sectionCodes = Object.keys(sections);
  const currentIndex = sectionCodes.indexOf(section);

  if (currentIndex >= sectionCodes.length) {
    return null;
  }

  return sectionCodes[currentIndex + 1];
};

export const isEndOfSection = (question, sections) => {
  const sectionQuestions = sections[question.section].questions;
  const questionIndex = sectionQuestions.indexOf(question.code);

  return questionIndex === sectionQuestions.length - 1;
};

export const getFollowingQuestions = (question, sections) => {
  const current = sections[question.section].questions.indexOf(question.code);
  const followingQuestions = [];

  sections[question.section].questions.forEach((questionCode, index) => {
    if (index <= current) {
      return;
    }

    followingQuestions.push(questionCode);
  });

  return followingQuestions;
};

export const getQuestionPosition = (code, config) => {
  if (!config.questionOrder) {
    return null;
  }

  return config.questionOrder.indexOf(code);
};

export const sortLabels = (a, b, direction = 'asc') => {
  let labelA = a.label;
  let labelB = b.label;
  if (direction === 'desc') {
    labelA = b.label;
    labelB = a.label;
  }

  let comparison = 0;
  if (labelA > labelB) {
    comparison = 1;
  } else if (labelA < labelB) {
    comparison = -1;
  }
  return comparison;
};

export const sortTransLabels = (a, b, direction = 'asc') => {
  let labelA = a.transLabel;
  let labelB = b.transLabel;
  if (direction === 'desc') {
    labelA = b.transLabel;
    labelB = a.transLabel;
  }

  let comparison = 0;
  if (labelA > labelB) {
    comparison = 1;
  } else if (labelA < labelB) {
    comparison = -1;
  }
  return comparison;
};

export const normalizeValue = (question, values) => {
  const { code, type } = question;

  if (type === 'date') {
    if (values[code] === null) {
      return '';
    }

    if (values[code]) {
      return normalizeDate(values[code]).format('DD/MM/YYYY');
    }
  }

  if (type === 'text' && values[code] === null) {
    return '';
  }

  return values[code];
};

export const normalizeValues = (questions, values) => {
  const normalizedValues = {};
  Object.keys(questions).forEach((questionCode) => {
    if (questions[questionCode]) {
      if (questions[questionCode].type === 'multi_question') {
        questions[questionCode].questions.map((subQuestion) => {
          normalizedValues[subQuestion.code] = normalizeValue(
            subQuestion,
            values
          );
        });
      } else {
        normalizedValues[questionCode] = normalizeValue(
          questions[questionCode],
          values
        );
      }
    }
  });

  return normalizedValues;
};

export const normalizeAnswers = (answers, questions) => {
  const values = {};
  Object.keys(answers).forEach((questionCode) => {
    if (questions[questionCode] && questions[questionCode].type === 'date') {
      if (answers[questionCode]) {
        values[questionCode] = normalizeDate(answers[questionCode]).format(
          'YYYY-MM-DD'
        );
      }
    } else {
      values[questionCode] = answers[questionCode];
    }
  });

  return values;
};

/**
 * Progress bar percentage calculation
 *
 * @example
 * // returns {q1: 25, q2: 25, q3: 60, q4: 70, q5: 80, q6: 90, q7: 100}
 * calculateProgressPercentage([
 *   [q1, q2]
 *   [q3, q4, q5, q6, q7]
 * ]);
 *
 * @param {Array} questionListing
 *
 * @return {Object}
 */
export const calculateProgressPercentage = (questionListing) => {
  const sectionPercentage = 100 / questionListing.length;
  const percentageConfig = {};
  let percentageValue = 0;

  questionListing.forEach((questions) => {
    questions.forEach((name) => {
      // Calculate percentage of each question block
      percentageValue += sectionPercentage / questions.length;
      percentageConfig[name] = Math.ceil(percentageValue);
    });
  });

  return percentageConfig;
};
