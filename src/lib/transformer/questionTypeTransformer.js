import { isKeySet } from '../object';
import transformDate from './questions/transformDate';
import transformEditBox from './questions/transformEditBox';
import transformCheckList from './questions/transformCheckList';
import transformMultiChoice from './questions/transformMultiChoice';
import transformSingleChoice from './questions/transformSingleChoice';

const parseAnnotations = (annotations) => {
  // @todo update so single mapping with support for thing.subthing.key to create a nested object
  // This will let us avoid the 2nd mapping we use for translations
  const mapping = {
    'rf/buttons-per-row': 'buttonsPerRow',
    'rf/banner-position': 'bannerPosition',
    'rf/banner-mobile-srcset': 'bannerMobileSrcset',
    'rf/banner-srcset': 'bannerSrcset',
    'rf/cta-label': 'ctaLabel',
    'rf/html-top': 'htmlTop',
    'rf/html-bottom': 'htmlBottom',
    'rf/tip-text': 'tipText',
    'rf/skip-question': 'skipQuestion',
    'rf/display-condition': 'displayCondition',
    'rf/default-value': 'defaultValue',
    'rf/checkout-step': 'checkoutStep',
  };

  const mapped = {};
  Object.keys(mapping).forEach((key) => {
    if (annotations[key]) {
      mapped[mapping[key]] = annotations[key];
    }
  });

  // Translations
  const transMapping = {
    'rf/translation-label': 'label',
    'rf/translation-prefix-label': 'prefixLabel',
    'rf/translation-placeholder': 'placeholder',
    'rf/translation-tooltip': 'tooltip',
    'rf/translation-choice-prefix': 'choicePrefix',
    'rf/translation-choice-template': 'choiceTemplate',
  };

  const transMapped = {
    translatePlaceholders: isKeySet(annotations, 'rf/translate-placeholders'),
  };
  Object.keys(transMapping).forEach((key) => {
    if (annotations[key]) {
      transMapped[transMapping[key]] = annotations[key];
    }
  });
  mapped.translations = transMapped;
  return mapped;
};

const transformMultipleQuestions = (questions, sectionMap) => {
  const questionConfig = {
    type: 'multi_question',
    questions: [],
  };

  Object.keys(questions).forEach((key) => {
    questionConfig.questions.push(
      transformQuestion(key, questions[key], sectionMap)
    );
  });

  const firstQuestion = questionConfig.questions[0];

  questionConfig.code = firstQuestion.code;
  questionConfig.section = sectionMap[firstQuestion.order];
  if (firstQuestion.checkoutStep) {
    questionConfig.checkoutStep = firstQuestion.checkoutStep;
  }
  return questionConfig;
};

const transformQuestion = (code, question, sectionMap) => {
  let questionConfig = {
    code,
    order: question.order,
    section: sectionMap[question.order],
    label: question.title,
    validation: question.validation ? question.validation : {},
  };

  if (question.dynamic_fetch) {
    questionConfig.dynamic = {
      group: question.dynamic_fetch,
      dependants: question.dynamic_fetch_groups,
    };
  }

  if (question.annotations) {
    questionConfig = {
      ...questionConfig,
      ...parseAnnotations(question.annotations),
    };
  }

  let typeConfig = {};
  switch (question.type) {
    case 'singlechoice':
      typeConfig = transformSingleChoice(question);
      if (!questionConfig.buttonsPerRow) {
        questionConfig.buttonsPerRow = typeConfig.singleChoices.length;
      }
      break;
    case 'date':
      typeConfig = transformDate(question);
      break;
    case 'editbox':
      typeConfig = transformEditBox(question);
      break;
    case 'multichoice':
      if (isKeySet(question.annotations, 'rf/checklist')) {
        if (isKeySet(question.annotations, 'rf/checklist-pre-selected')) {
          typeConfig = transformCheckList(question, true);
        } else {
          typeConfig = transformCheckList(question, false);
        }
      } else {
        typeConfig = transformMultiChoice(question);
      }
      break;
  }

  questionConfig = {
    ...questionConfig,
    ...typeConfig,
  };
  // Override With Translations
  if (questionConfig.translations.placeholder) {
    questionConfig.placeholder = questionConfig.translations.placeholder;
  }
  if (questionConfig.translations.tooltip) {
    questionConfig.tipText = questionConfig.translations.tooltip;
  }
  if (questionConfig.translations.label) {
    questionConfig.label = questionConfig.translations.label;
  }

  return questionConfig;
};

export { parseAnnotations, transformMultipleQuestions, transformQuestion };
