import { isKeySet } from '../../object';

const transformChoiceLabel = (choice, annotations) => {
  if (!annotations['rf/translation-choice-prefix']) {
    return choice.label;
  }

  const prefix = annotations['rf/translation-choice-prefix'];
  if (isKeySet(annotations, 'rf/translate-placeholders')) {
    return choice.label.replace(
      /__[A-Za-z_]+__/g,
      (match) => `__${prefix}placeholders.${match.replace(/__/g, '')}__`
    );
  }
  return prefix + choice.value;
};

export default transformChoiceLabel;
