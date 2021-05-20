const getProductDetails = (products, list) => {
  if (!Array.isArray(products)) {
    products = [products];
  }

  return {
    detail: {
      actionField: { list },
      products: products.map((product) => ({ ...product })),
    },
  };
};

export default getProductDetails;
