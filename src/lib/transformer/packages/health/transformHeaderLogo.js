const imagePrefix =
  'https://rabbitfinance.com/qflow/static/products/health-insurance/quote';

export default (category, subCategory) => {
  return `${imagePrefix}/${category}/${subCategory}.svg?0`;
};
