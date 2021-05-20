import yupFactory from './yupFactory';

export default (questions) => {
  const reducer = (schema, question) => {
    let validation;
    const [name, config] = question;
    const validationConfig = config.validation
      ? config.validation
      : { rule: 'default' };

    const { rule, ...params } = validationConfig;

    validation = yupFactory(rule, params);

    if (!validation) {
      return schema;
    }

    return {
      ...schema,
      [name]: validation,
    };
  };

  return Object.entries(questions).reduce(reducer, {});
};
