import transformChoice from './transformChoice';

const transformCheckList = (question, isPreSelected) => {
  const typeConfig = {
    type: 'checklist',
    checkboxes: [],
  };

  question.multichoice.choices.forEach((choice) => {
    const transformedOption = transformChoice(choice);
    typeConfig.checkboxes.push({
      ...transformedOption,
      isPreSelected,
    });
  });
  return typeConfig;
};

export default transformCheckList;
