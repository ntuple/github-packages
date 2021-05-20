export default (
  { invoice_price, gross_mandatory_premium },
  { insuranceCategory = 'both' }
) => {
  return insuranceCategory === 'voluntary'
    ? Math.ceil(invoice_price - gross_mandatory_premium)
    : invoice_price;
};
