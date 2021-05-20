const transformEditBox = (question) => {
  const config = {
    type: 'text',
  };

  if (question.validation && question.validation.rule) {
    switch (question.validation.rule) {
      case 'phone':
        config.type = 'phone';
        break;
      case 'email':
        config.type = 'email';
        break;
      default:
    }
  }

  if (question.placeholder) {
    config.placeholder = question.placeholder;
  }

  return config;
};

export default transformEditBox;
