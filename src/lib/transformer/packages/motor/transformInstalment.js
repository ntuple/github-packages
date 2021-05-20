export default (apiPackage) => {
  if (apiPackage.invoice_price >= 5000 && apiPackage.invoice_price <= 9999) {
    return 3;
  } else if (
    apiPackage.invoice_price >= 10000 &&
    apiPackage.invoice_price <= 19999
  ) {
    return 6;
  } else if (apiPackage.invoice_price >= 20000) {
    return 10;
  } else {
    return null;
  }
};
