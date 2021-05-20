export default {
  sort: {
    title: 'motor:quote.filter.titles.sort',
    tooltip: 'motor:quote.filter.tooltips.sort',
    buttonsPerRow: 2,
    code: 'sortBy',
    values: [
      { key: 'price', label: 'motor:quote.filter.choices.sort.price' },
      { key: 'brand', label: 'motor:quote.filter.choices.sort.brand' },
    ],
  },
  quickFilter: [
    { value: 'Type 1', text: 'motor:quote.filter.choices.type.type_1' },
    {
      value: 'Type 2+/3+',
      text: 'motor:quote.filter.choices.type.type_2+/3+',
    },
    { value: 'Type 2/3', text: 'motor:quote.filter.choices.type.type_2/3' },
  ],
  filters: [
    {
      code: 'insuranceCategory',
      title: 'motor:quote.filter.titles.category',
      tooltip: 'motor:quote.filter.tooltips.category',
      buttonsPerRow: 1,
      type: 'radio',
      values: [
        {
          key: 'voluntary',
          label: 'motor:quote.filter.choices.category.voluntary',
        },
        {
          key: 'mandatory',
          label: 'motor:quote.filter.choices.category.compulsory',
        },
        { key: 'both', label: 'motor:quote.filter.choices.category.both' },
      ],
    },
    {
      code: 'insuranceType',
      title: 'motor:quote.filter.titles.type',
      tooltip: 'motor:quote.filter.tooltips.type',
      buttonsPerRow: 1,
      type: 'checkboxButton',
      values: [
        { key: 'Type 1', label: 'motor:quote.filter.choices.type.type_1' },
        {
          key: 'Type 2+/3+',
          label: 'motor:quote.filter.choices.type.type_2+/3+',
        },
        { key: 'Type 2/3', label: 'motor:quote.filter.choices.type.type_2/3' },
      ],
    },
    {
      code: 'repairType',
      title: 'motor:quote.filter.titles.repair_type',
      tooltip: 'motor:quote.filter.tooltips.repair_type',
      buttonsPerRow: 1,
      type: 'radio',
      values: [
        {
          key: 'dealer',
          label: 'motor:quote.filter.choices.repair_type.dealer',
        },
        {
          key: 'garage',
          label: 'motor:quote.filter.choices.repair_type.garage',
        },
        { key: 'both', label: 'motor:quote.filter.choices.repair_type.both' },
      ],
    },
    {
      code: 'deductible',
      title: 'motor:quote.filter.titles.deductible',
      tooltip: 'motor:quote.filter.tooltips.deductible',
      buttonsPerRow: 1,
      type: 'radio',
      values: [
        {
          key: 'all_packages',
          label: 'motor:quote.filter.choices.deductible.all_packages',
        },
        {
          key: 'no_deductible',
          label: 'motor:quote.filter.choices.deductible.no_deductible',
        },
        {
          key: 'only_deductible',
          label: 'motor:quote.filter.choices.deductible.only_deductible',
        },
      ],
    },
    {
      code: 'driver',
      title: 'motor:quote.filter.titles.driver',
      tooltip: 'motor:quote.filter.tooltips.driver',
      buttonsPerRow: 1,
      type: 'radio',
      values: [
        {
          key: 'all_packages',
          label: 'motor:quote.filter.choices.driver.all_packages',
        },
        {
          key: 'any_driver',
          label: 'motor:quote.filter.choices.driver.any_driver',
        },
        {
          key: 'named_driver',
          label: 'motor:quote.filter.choices.driver.named_driver',
        },
      ],
    },
  ],
};
