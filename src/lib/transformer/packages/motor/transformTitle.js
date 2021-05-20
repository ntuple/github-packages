import { isKeySet } from '../../../object';

export default (apiPackage, lang) => {
  if (isKeySet(apiPackage, 'insurance_company')) {
    switch (lang) {
      case 'en':
        return apiPackage.insurance_company.shortname_en;
      case 'th':
        return apiPackage.insurance_company.shortname_th;
    }
  }

  return '';
};
