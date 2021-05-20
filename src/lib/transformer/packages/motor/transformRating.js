const DEFAULT_RATING = 4.95;
export default (apiPackage) => {
  if (apiPackage.insurance_company && apiPackage.insurance_company.rating) {
    return apiPackage.insurance_company.rating;
  } else {
    return DEFAULT_RATING;
  }
};
