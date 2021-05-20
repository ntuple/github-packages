const getCheckoutOption = (step, option) => {
  return {
    checkout_option: {
      actionField: {
        step,
        option,
      },
    },
  };
};

export default getCheckoutOption;
