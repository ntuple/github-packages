import Product from '../../../analytics/ecommerce/model/Product';

export default (apiPackage) => {
  // Category: Type 1, Type2, etc
  // Variant: compulsory/voluntary/both
  const {
    category,
    id,
    insurer,
    plan,
    premium,
    product,
    subCategory,
  } = apiPackage;

  return new Product({
    id: id,
    name: `${product.name.en} (${plan.name.en})`,
    price: premium,
    brand: insurer.name.en,
    category: `${category}/${subCategory}`,
  });
};
