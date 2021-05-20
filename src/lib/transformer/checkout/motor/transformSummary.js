import { numberToMoney } from '../../../money';

export default (apiSummary, lang) => {
  const i18nPrefix = 'common:checkout';
  const packageName =
    lang === 'en'
      ? apiSummary.package.insurance_company_en
      : apiSummary.package.insurance_company_th;
  const packageDetails = {
    title: `${i18nPrefix}.insurance_detail`,
    label: `${packageName}\n${apiSummary.package.type}`,
    value: numberToMoney(apiSummary.package.price),
  };
  const installments =
    apiSummary.payment.installments === null
      ? 1
      : parseInt(apiSummary.payment.installments);

  const subTotal = {
    label: `${i18nPrefix}.sub_total`,
    value: numberToMoney(apiSummary.subtotal),
  };

  const total = {
    label:
      installments === 1
        ? `${i18nPrefix}.total_price`
        : `${i18nPrefix}.total_price_per_month`,
    value: numberToMoney(apiSummary.payment.payment_amount),
  };

  const payment = {
    title: `${i18nPrefix}.payment`,
    label: `${i18nPrefix}.installment_period`,
    value: installments,
  };

  const addOns = {
    title: `${i18nPrefix}.add_on`,
    items: [],
  };

  Object.keys(apiSummary.addons).forEach((key) => {
    let label =
      key === 'compulsory'
        ? `${i18nPrefix}.mandatory_insurance`
        : `${i18nPrefix}.roadside_assistant`;
    if (key === 'compulsory') {
      addOns.items.push({
        label,
        packageName: `${packageName}`,
        value: numberToMoney(apiSummary.addons[key]),
        class: 'text-success',
      });
    } else {
      addOns.items.push({
        label,
        value: numberToMoney(apiSummary.addons[key]),
        class: 'text-success',
      });
    }
  });

  const discounts = {
    title: `${i18nPrefix}.discounts`,
    items: [],
  };

  Object.keys(apiSummary.discount).forEach((key) => {
    if (apiSummary.discount[key] > 0) {
      discounts.items.push({
        label: `${i18nPrefix}.${key}`,
        value: numberToMoney(-Math.abs(apiSummary.discount[key])),
        class: 'text-danger',
      });
    }
  });
  return {
    packageDetails,
    subTotal,
    payment,
    total,
    addOns,
    discounts,
  };
};
