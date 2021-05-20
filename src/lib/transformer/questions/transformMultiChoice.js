import transformChoice from './transformChoice';

const transformMultiChoice = (question) => {
  const typeConfig = {
    type: 'square_checkboxes',
    checkboxes: [],
  };

  question.multichoice.choices.forEach((choice) => {
    typeConfig.checkboxes.push(transformChoice(choice));
  });
  return typeConfig;
};

export default transformMultiChoice;
