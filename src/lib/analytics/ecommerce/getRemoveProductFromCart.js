const getRemoveProductFromCart = (product) => {
  return {
    remove: {
      products: [
        {
          ...product,
          quantity: 1,
        },
      ],
    },
  };
};

export default getRemoveProductFromCart;
