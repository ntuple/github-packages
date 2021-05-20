const srcSet = [
  'https://rabbitfinance.com/qflow/static/products/health-insurance/insurers/__id__.png 1x',
  'https://rabbitfinance.com/qflow/static/products/health-insurance/insurers/__id__@2x.png 2x',
];

export default (insurerCode) => {
  return srcSet.map((logo) => logo.replace('__id__', insurerCode)).join(', ');
};
