const transformDate = (question) => {
  const config = {
    type: 'date',
  };

  if (question.placeholder) {
    config.placeholder = question.placeholder;
  }
  const { date } = question;
  if (date) {
    config.presets = date.presets;
  }
  return config;
};

export default transformDate;
