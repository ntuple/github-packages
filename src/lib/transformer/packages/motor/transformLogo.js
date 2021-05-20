import { isKeySet } from '../../../object';

const srcSet = [
  'https://staging-finance.rabbitinternet.com/qflow/static/insurers/__id__.png 1x',
  'https://staging-finance.rabbitinternet.com/qflow/static/insurers/__id__@2x.png 2x',
];

export default (apiPackage) => {
  if (!isKeySet(apiPackage, 'insurance_company')) {
    return '';
  }

  const id = apiPackage.insurance_company.id;

  return srcSet.map((logo) => logo.replace('__id__', id)).join(', ');
};
