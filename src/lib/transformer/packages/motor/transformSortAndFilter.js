/**
 * @param {set} prices
 */
export const getRangeFilter = (prices) => {
  let rangeFilter = {
    code: 'sumInsured',
    title: 'motor:quote.filter.titles.sum_insured',
    tooltip: 'motor:quote.filter.tooltips.sum_insured',
    step: 10000,
    min: 0,
    max: 0,
    type: 'range',
  };

  if (!prices.size) {
    return rangeFilter;
  }

  //convert set to array and sort by ascending order
  let sortedPrices = [...prices].sort((a, b) => a - b);

  rangeFilter.min = sortedPrices[0];
  rangeFilter.max = sortedPrices[sortedPrices.length - 1];
  return rangeFilter;
};

export const getInsurerFilter = (insurerIds) => {
  let insurerFilter = {
    code: 'insurer',
    title: 'motor:quote.filter.titles.insurer',
    tooltip: 'motor:quote.filter.tooltips.insurer',
    type: 'checkbox',
    values: [],
  };

  insurerIds.forEach((insurerId) => {
    insurerFilter.values.push({
      key: `${insurerId}`,
      label: `motor:questions.choices.insurer_name.${insurerId}`,
    });
  });

  return insurerFilter;
};
