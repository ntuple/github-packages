import transformChoiceLabel from './transformChoiceLabel';

/**
 * @param {object} choice - question's choice
 * @param {array} annotations - question's annotations
 */
const transformChoice = (choice, annotations = []) => {
  const choiceConfig = {
    value: choice.value ? choice.value : choice.label.toLowerCase(),
    label: transformChoiceLabel(choice, annotations),
  };

  if (annotations['rf/popular-choice-img-srcset-template']) {
    choiceConfig.image = {
      srcSet: annotations['rf/popular-choice-img-srcset-template'].replace(
        /__value__/g,
        choiceConfig.value
      ),
      alt: `${choiceConfig.label} logo`,
    };
  }

  if (annotations['rf/popular-choice-icon-srcset-template']) {
    choiceConfig.icon = {
      srcSet: annotations['rf/popular-choice-icon-srcset-template'].replace(
        /__value__/g,
        choiceConfig.value
      ),
      alt: `${choiceConfig.value} icon`,
    };
  }

  if (choice.annotations) {
    if (choice.annotations['rf/icon']) {
      choiceConfig.icon = choice.annotations['rf/icon'];
    }
    if (choice.annotations['rf/subtitle']) {
      choiceConfig.title = choice.annotations['rf/subtitle'];
    }
    if (choice.annotations['rf/description']) {
      choiceConfig.desc = choice.annotations['rf/description'];
    }
    if (choice.annotations['rf/label']) {
      choiceConfig.label = choice.annotations['rf/label'];
    }
    if (choice.annotations['rf/display-condition']) {
      choiceConfig.displayCondition =
        choice.annotations['rf/display-condition'];
    }
  }
  return choiceConfig;
};

export default transformChoice;
