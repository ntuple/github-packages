export default {
  ipdOpd: {
    sort: {
      title: 'health:quote.filter.titles.sort',
      tooltip: 'health:quote.filter.tooltips.sort',
      buttonsPerRow: 2,
      code: 'sortBy',
      type: 'dropdown',
      values: [
        {
          key: 'premium_min-max',
          label: 'health:quote.filter.choices.sort.premium_min-max',
        },
        {
          key: 'premium_max-min',
          label: 'health:quote.filter.choices.sort.premium_max-min',
        },
        {
          key: 'ipdopd_sum_insured_per_year_min-max',
          label:
            'health:quote.filter.choices.sort.ipdopd_sum_insured_per_year_min-max',
        },
        {
          key: 'ipdopd_sum_insured_per_year_max-min',
          label:
            'health:quote.filter.choices.sort.ipdopd_sum_insured_per_year_max-min',
        },
        {
          key: 'ipdopd_non_intensive_care_min-max',
          label:
            'health:quote.filter.choices.sort.ipdopd_non_intensive_care_min-max',
        },
        {
          key: 'ipdopd_non_intensive_care_max-min',
          label:
            'health:quote.filter.choices.sort.ipdopd_non_intensive_care_max-min',
        },
      ],
    },
    quickFilter: [{ value: 'hotDeal', text: 'health:quote.filter.hot_deal' }],
    filters: [
      {
        code: 'insuranceType',
        title: 'health:quote.filter.titles.quick_search',
        tooltip: 'health:quote.filter.tooltips.quick_search',
        buttonsPerRow: 1,
        type: 'checkboxButton',
        values: [{ key: 'hotDeal', label: 'health:quote.filter.hot_deal' }],
      },
      {
        code: 'premium',
        title: 'health:quote.filter.titles.premium',
        tooltip: 'health:quote.filter.tooltips.premium',
        step: 1000,
        rangeType: 'input',
        min: 3000,
        max: 150000,
        type: 'range',
      },
      {
        code: 'sum_insured',
        title: 'health:quote.filter.titles.coverage',
        tooltip: 'health:quote.filter.tooltips.coverage',
        step: 2000,
        min: 10000,
        rangeType: 'input',
        max: 50000000,
        type: 'range',
      },
    ],
  },
  disease: {
    sort: {
      title: 'health:quote.filter.titles.sort',
      tooltip: 'health:quote.filter.tooltips.sort',
      buttonsPerRow: 2,
      code: 'sortBy',
      type: 'dropdown',
      values: [
        {
          key: 'premium_min-max',
          label: 'health:quote.filter.choices.sort.premium_min-max',
        },
        {
          key: 'premium_max-min',
          label: 'health:quote.filter.choices.sort.premium_max-min',
        },
        {
          key: 'ci_max_coverage_min-max',
          label: 'health:quote.filter.choices.sort.ci_max_coverage_min-max',
        },
        {
          key: 'ci_max_coverage_max-min',
          label: 'health:quote.filter.choices.sort.ci_max_coverage_max-min',
        },
      ],
    },
    quickFilter: [{ value: 'hotDeal', text: 'health:quote.filter.hot_deal' }],
    filters: [
      {
        code: 'insuranceType',
        title: 'health:quote.filter.titles.quick_search',
        tooltip: 'health:quote.filter.tooltips.quick_search',
        buttonsPerRow: 1,
        type: 'checkboxButton',
        values: [{ key: 'hotDeal', label: 'health:quote.filter.hot_deal' }],
      },
      {
        code: 'premium',
        title: 'health:quote.filter.titles.premium',
        tooltip: 'health:quote.filter.tooltips.premium',
        step: 1000,
        min: 100,
        max: 50000,
        type: 'range',
      },
      {
        code: 'sum_insured',
        title: 'health:quote.filter.titles.coverage',
        tooltip: 'health:quote.filter.tooltips.coverage',
        step: 2000,
        min: 1000,
        max: 5000000,
        type: 'range',
      },
    ],
  },
  pa: {
    sort: {
      title: 'health:quote.filter.titles.sort',
      tooltip: 'health:quote.filter.tooltips.sort',
      buttonsPerRow: 2,
      code: 'sortBy',
      type: 'dropdown',
      values: [
        {
          key: 'premium_min-max',
          label: 'health:quote.filter.choices.sort.premium_min-max',
        },
        {
          key: 'premium_max-min',
          label: 'health:quote.filter.choices.sort.premium_max-min',
        },
        {
          key: 'pa_max_coverage_min-max',
          label: 'health:quote.filter.choices.sort.pa_max_coverage_min-max',
        },
        {
          key: 'pa_max_coverage_max-min',
          label: 'health:quote.filter.choices.sort.pa_max_coverage_max-min',
        },
      ],
    },
    quickFilter: [{ value: 'hotDeal', text: 'health:quote.filter.hot_deal' }],
    filters: [
      {
        code: 'insuranceType',
        title: 'health:quote.filter.titles.quick_search',
        tooltip: 'health:quote.filter.tooltips.quick_search',
        buttonsPerRow: 1,
        type: 'checkboxButton',
        values: [{ key: 'hotDeal', label: 'health:quote.filter.hot_deal' }],
      },
      {
        code: 'premium',
        title: 'health:quote.filter.titles.premium',
        tooltip: 'health:quote.filter.tooltips.premium',
        step: 1000,
        min: 100,
        max: 50000,
        type: 'range',
      },
      {
        code: 'sum_insured',
        title: 'health:quote.filter.titles.coverage',
        tooltip: 'health:quote.filter.tooltips.coverage',
        step: 2000,
        min: 10000,
        max: 50000000,
        type: 'range',
      },
    ],
  },
};
