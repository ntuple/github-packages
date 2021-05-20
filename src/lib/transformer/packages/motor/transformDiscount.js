const DISCOUNT_MARKUP = 3;
const DISCOUNT_THRESHOLD = 5;

export default (apiPackage) => {
  if (!apiPackage.car_discount_percentage) {
    return null;
  }

  const markedUpDiscount = apiPackage.car_discount_percentage + DISCOUNT_MARKUP;

  if (markedUpDiscount <= DISCOUNT_THRESHOLD) {
    return null;
  }

  return {
    amount: apiPackage.car_discount_amount,
    percent: markedUpDiscount,
  };
};
