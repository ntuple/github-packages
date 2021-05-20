export const numberToMoney = (amount, locale = 'th-TH', currency = null) => {
  const options = {};
  if (currency) {
    options.style = 'currency';
    options.currency = currency;
  }

  const formatter = new Intl.NumberFormat(locale, options);

  return formatter.format(amount);
};
