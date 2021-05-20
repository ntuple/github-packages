import { toSnakeCase } from '../string';
import {
  transformQuestion,
  transformMultipleQuestions,
} from './questionTypeTransformer';
import { findMultiQuestions } from '../questions';

const convertTitleToCode = (title) => {
  return toSnakeCase(title);
};

export const createSectionMap = (sections, max) => {
  const sectionMap = [];
  sections.forEach((section) => {
    const sectionCode = convertTitleToCode(section.title);
    const currentLength = sectionMap.length;
    const last = section.last ? section.last : max;
    const numQuestions = last - (currentLength > 0 ? currentLength - 1 : 0);

    if (numQuestions > 0) {
      [...Array(numQuestions).keys()].forEach((key) => {
        sectionMap[key + (currentLength > 0 ? currentLength : 1)] = sectionCode;
      });
    }
  });
  return sectionMap;
};

const getQuestionOrder = (questions) => {
  const questionOrder = [];
  Object.keys(questions).forEach((key) => {
    questionOrder[questions[key].order] = key;
  });

  return questionOrder.filter((value) => value);
};

/**
 * Init questions visibility by visible only a first question
 *
 * @param {Object} questions
 * @returns {Object}
 */
const initQuestionsVisibility = (questions, questionOrder) => {
  const firstQuestion = questionOrder[0];
  const questionsVisibility = {};
  Object.keys(questions).forEach((name) => {
    questionsVisibility[name] = name === firstQuestion;
  });

  return questionsVisibility;
};

/**
 * Init sections visibility by visible only a first section
 *
 * @param {Object[]} sections
 * @returns {Object}
 */
const initSectionsVisibility = (sections) => {
  const sectionsVisibility = {};

  Object.keys(transformSections(sections)).forEach((name, index) => {
    sectionsVisibility[name] = index === 0;
  });

  return sectionsVisibility;
};

const transformQuestions = (questions, questionOrder, sectionMap) => {
  const config = {};
  const { skipQuestions, multiQuestions } = findMultiQuestions(
    questions,
    questionOrder
  );
  Object.keys(questions).forEach((key) => {
    if (skipQuestions.includes(key)) {
      return;
    }
    const question = questions[key];
    if (Object.keys(multiQuestions).includes(key)) {
      config[key] = transformMultipleQuestions(multiQuestions[key], sectionMap);
      return;
    }

    if (!skipQuestions.includes(key)) {
      config[key] = transformQuestion(key, question, sectionMap);
    }
  });

  return config;
};

const transformSections = (sections) => {
  const sectionsConfig = {};

  sections.forEach((section) => {
    const code = convertTitleToCode(section.title);
    sectionsConfig[code] = {
      code,
      label: section.title,
      ...(Boolean(section.detail) && { detail: section.detail }),
      questions: [],
    };
  });

  return sectionsConfig;
};

export default (flow) => {
  const { sections, questions } = flow;
  const questionOrder = getQuestionOrder(questions);
  const questionsVisibility = initQuestionsVisibility(questions, questionOrder);
  const sectionsVisibility = initSectionsVisibility(sections);
  const sectionMap = createSectionMap(sections, questionOrder.length);

  const config = {
    questionOrder,
    questionsVisibility,
    sectionsVisibility,
    questions: transformQuestions(questions, questionOrder, sectionMap),
    sections: transformSections(sections),
  };

  questionOrder.forEach((questionCode) => {
    if (config.questions[questionCode]) {
      const question = config.questions[questionCode];
      config.sections[question.section].questions.push(questionCode);
    }
  });

  return config;
};
