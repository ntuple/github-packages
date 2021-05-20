import Product from '../../../analytics/ecommerce/model/Product';
import transformPremium from './transformPremium';

export default (apiPackage, filterValues) => {
  // Category: Type 1, Type2, etc
  // Variant: compulsory/voluntary/both
  const { id, car_insurance_type, insurance_company } = apiPackage;
  const { insuranceCategory } = filterValues;

  return new Product({
    id: id,
    name: `${insurance_company.shortname_en} ${car_insurance_type}`,
    price: transformPremium(apiPackage, filterValues),
    brand: insurance_company.shortname_en,
    category: car_insurance_type,
    variant: insuranceCategory,
  });
};
