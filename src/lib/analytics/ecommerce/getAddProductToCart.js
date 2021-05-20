const getAddProductToCart = (product) => {
  return {
    currencyCode: 'THB',
    add: {
      products: [
        {
          ...product,
          quantity: 1,
        },
      ],
    },
  };
};

export default getAddProductToCart;
