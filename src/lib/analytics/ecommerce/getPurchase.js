const getPurchase = (orderId, product, coupon = null) => {
  const purchase = {
    purchase: {
      actionField: {
        id: orderId,
        affiliation: 'Rabbit Finance',
        revenue: product.price,
      },
      products: [
        {
          ...product,
          quantity: 1,
        },
      ],
    },
  };

  if (coupon !== null) {
    purchase.purchase.actionField.coupon = coupon;
  }

  return purchase;
};

export default getPurchase;
