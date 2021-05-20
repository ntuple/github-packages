import { numberToMoney } from '../../../money';

export default (apiSummary, lang) => {
  const { insurer, plan, premium } = apiSummary.package;
  const i18nPrefix = 'common:checkout';
  const packageDetails = {
    id: apiSummary.package.id,
    title: `${i18nPrefix}.insurance_detail`,
    i18nKey: 'health:checkout.summary.package_name',
    i18nValues: {
      insurerName: insurer.name[lang],
      planName: plan.name[lang],
    },
    value: numberToMoney(premium),
  };
  const installments = 1;

  const subTotal = null;

  const total = {
    label: `${i18nPrefix}.total_price`,
    value: numberToMoney(premium),
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

  const discounts = {
    title: `${i18nPrefix}.discounts`,
    items: [],
  };

  return {
    packageDetails,
    subTotal,
    payment,
    total,
    addOns,
    discounts,
  };
};
