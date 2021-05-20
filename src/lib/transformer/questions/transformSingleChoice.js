import { isKeySet } from 'lib/object';
import { sortLabels } from 'lib/questions';
import transformChoice from './transformChoice';
import transformChoiceLabel from './transformChoiceLabel';

const transformSingleChoice = (question) => {
  const typeConfig = {
    type: 'combo_radio_select',
    choiceTranslation: null,
    singleChoices: [],
    selectOptions: [],
  };
  let skipButtons = false;
  let noDropdown = false;
  const { annotations, singlechoice } = question;

  if (annotations) {
    if (annotations['rf/choice-translation']) {
      typeConfig.choiceTranslation = annotations['rf/choice-translation'];
    }

    if (annotations['rf/order']) {
      typeConfig.sortLabels = annotations['rf/order'];
    }
  }

  if (singlechoice && singlechoice.choices) {
    if (annotations && annotations['rf/singlechoice-dropdown']) {
      skipButtons = annotations['rf/singlechoice-dropdown'] === 'only';
      noDropdown = annotations['rf/singlechoice-dropdown'] === 'never'; // true
    }

    const numChoices = singlechoice.choices.length; // 2

    // Set the popular choice count
    let popularCount;
    if (singlechoice.popularcount) {
      popularCount = singlechoice.popularcount;
    } else {
      popularCount = noDropdown ? numChoices : 6;
    }

    if (!skipButtons) {
      const numButtons = popularCount <= numChoices ? popularCount : numChoices;

      let i;
      for (i = 0; i < numButtons; i += 1) {
        typeConfig.singleChoices.push(
          transformChoice(singlechoice.choices[i], annotations)
        );
      }

      // Add jump to button to the last choice
      if (annotations && isKeySet(annotations, 'rf/last-choice-jump-to')) {
        typeConfig.singleChoices.push({
          value: `jumpTo_${annotations['rf/last-choice-jump-to']}`,
          jumpTo: annotations['rf/last-choice-jump-to'],
          label: annotations['rf/last-choice-jump-label'],
        });
      }
    }

    if (typeConfig.singleChoices.length < numChoices) {
      singlechoice.choices.forEach((choice) => {
        typeConfig.selectOptions.push({
          label: transformChoiceLabel(choice, annotations),
          value: choice.value ? choice.value : choice.label.toLowerCase(),
        });
      });

      // Sort the Choices if required by annotation
      if (annotations['rf/order']) {
        typeConfig.selectOptions.sort((a, b) =>
          sortLabels(a, b, annotations['rf/order'])
        );
      }

      if (question.placeholder || annotations['rf/translation-placeholder']) {
        typeConfig.selectOptions.unshift({
          label: annotations['rf/translation-placeholder']
            ? annotations['rf/translation-placeholder']
            : question.placeholder,
          isPlaceHolder: true, // this option is added to hide placeholder from options list
        });
      }
    }
  }

  return typeConfig;
};

export default transformSingleChoice;
