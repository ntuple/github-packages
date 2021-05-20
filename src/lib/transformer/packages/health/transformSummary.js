import { numberToMoney } from 'lib/money';

// Map translation keys with health category from API
const healthCategorySummaries = {
  ipdOpd: [
    {
      key: 'ipdopd_sum_insured_per_year',
      bulletPoint: false,
      hightlight: true,
    },
    { key: 'ipdopd_non_intensive_care', bulletPoint: true, hightlight: false },
    { key: 'ipdopd_hospital_expense', bulletPoint: true, hightlight: false },
    { key: 'ipdopd_surgeon_fee', bulletPoint: true, hightlight: false },
    { key: 'ipdopd_out_medic_expense', bulletPoint: false, hightlight: true },
  ],
  disease: [
    { key: 'ci_max_coverage', bulletPoint: false, hightlight: true },
    { key: 'ci_medic_expense', bulletPoint: true, hightlight: false },
    { key: 'ci_pay_on_diagnosis', bulletPoint: true, hightlight: false },
    { key: 'ci_disease_coverage', bulletPoint: false, hightlight: true },
  ],
  pa: [
    { key: 'pa_loss_of_life', bulletPoint: false, hightlight: false },
    { key: 'pa_perm_disability', bulletPoint: false, hightlight: false },
    { key: 'pa_medic_expense', bulletPoint: false, hightlight: false },
    { key: 'pa_daily_comp', bulletPoint: false, hightlight: false },
  ],
};

export default (apiPackage, lang) => {
  const summary = [];
  const { category, coverage } = apiPackage;
  const i18nPrefix = 'health:quote.package.summary';

  healthCategorySummaries[category].forEach((data) => {
    const coverageValue = coverage[data.key];
    let summaryValue = '-';
    let valueType = 'number';

    if (coverageValue) {
      const { highlight, summary, limitValue } = coverageValue;

      if (highlight) {
        summaryValue = highlight[lang];
        valueType = 'text';
      } else if (summary) {
        summaryValue = summary[lang];
        valueType = 'text';
      } else if (limitValue !== null) {
        summaryValue = numberToMoney(limitValue);
      }
    }

    summary.push({
      text: `${i18nPrefix}.${data.key}`,
      value: summaryValue,
      valueType,
      bulletPoint: data.bulletPoint,
      hightlight: data.hightlight,
    });
  });

  return summary;
};
