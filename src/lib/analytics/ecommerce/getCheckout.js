const getCheckout = (step, product) => {
  return {
    checkout: {
      actionField: { step },
      products: [
        {
          ...product,
          quantity: 1,
        },
      ],
    },
  };
};

export default getCheckout;
