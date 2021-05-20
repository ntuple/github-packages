import { normalizeString } from '../../../string';

export default (apiPackage) => {
  const {
    insurance_category: insuranceCategory,
    car_insurance_type: insuranceType,
  } = apiPackage;

  if (['mandatory', 'voluntary'].includes(insuranceCategory)) {
    if (insuranceCategory === 'mandatory') {
      return `motor:common.insurance_types.compulsory`;
    }

    if (insuranceType) {
      return `motor:common.insurance_types.${normalizeString(insuranceType)}`;
    }
  }

  return '';
};
