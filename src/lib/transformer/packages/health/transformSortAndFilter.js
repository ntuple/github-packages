/**
 * @param {set} prices
 */
export const getPremiumRangeFilter = (prices, category) => {
  const rangeFilter = {
    code: 'premium',
    title: 'health:quote.filter.titles.premium',
    tooltip: 'health:quote.filter.tooltips.premium',
    step: 1000,
    min: category === 'ipdOpd' ? 3000 : 100,
    max: category === 'ipdOpd' ? 150000 : 50000,
    type: 'range',
    rangeType: 'input',
  };

  if (!prices.size) {
    return rangeFilter;
  }
  rangeFilter.min = Math.min(...Array.from(prices));
  rangeFilter.max = Math.max(...Array.from(prices));
  return rangeFilter;
};

export const getInsurerFilter = (insurers, language) => {
  const insurerFilter = {
    code: 'insurer',
    title: 'health:quote.filter.titles.insurer',
    tooltip: 'health:quote.filter.tooltips.insurer',
    type: 'checkbox',
    values: [],
  };
  insurers.forEach((insurer) => {
    insurerFilter.values.push({
      key: `${insurer.code}`,
      label: `${insurer.name[language]}`,
    });
  });
  return insurerFilter;
};

export const getFeatureFilter = (features) => {
  const featureFilter = {
    code: 'features',
    title: 'health:quote.filter.titles.features',
    tooltip: 'health:quote.filter.tooltips.features',
    type: 'checkbox',
    values: [],
  };

  features.forEach((feature) => {
    featureFilter.values.push({
      key: `${feature}`,
      label: `health:tags.${feature}`,
    });
  });
  return featureFilter;
};

export const getCoverageRangeFilter = (packages, category) => {
  const rangeFilter = {
    code: 'sumInsured',
    title: 'health:quote.filter.titles.coverage',
    tooltip: 'health:quote.filter.tooltips.coverage',
    step: 50000,
    min: category === 'ipdOpd' ? 10000 : 1000,
    max: category === 'ipdOpd' ? 50000000 : 5000000,
    type: 'range',
    rangeType: 'input',
  };
  const prices = new Set();
  packages.forEach((apiPackage) => {
    switch (category) {
      case 'ipdOpd':
        if (apiPackage.coverage.ipdopd_sum_insured_per_year) {
          prices.add(
            parseInt(
              apiPackage.coverage.ipdopd_sum_insured_per_year.limitValue,
              10
            )
          );
        }
        break;
      case 'disease':
        if (apiPackage.coverage.ci_max_coverage) {
          prices.add(
            parseInt(apiPackage.coverage.ci_max_coverage.limitValue, 10)
          );
        }
        break;
      case 'pa':
        if (apiPackage.coverage.pa_max_coverage) {
          prices.add(
            parseInt(apiPackage.coverage.pa_max_coverage.limitValue, 10)
          );
        }
        break;
      default:
        break;
    }
  });
  if (!prices.size) {
    return rangeFilter;
  }
  rangeFilter.min = Math.min(...Array.from(prices));
  rangeFilter.max = Math.max(...Array.from(prices));
  return rangeFilter;
};
