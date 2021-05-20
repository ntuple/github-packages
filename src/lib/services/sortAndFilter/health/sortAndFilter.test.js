import { expect, test } from '@jest/globals';
import packages from './test-data/packages.json';
import premiumUnsorted from './test-data/premium_unsorted.json';
import premiumSortedAsc from './test-data/premium_sorted_asc.json';
import premiumSortedDesc from './test-data/premium_sorted_desc.json';
import sumInsuredUnsorted from './test-data/coverage_unsorted.json';
import ipdopd_sum_insured_per_year_asc from './test-data/ipdopd_sum_insured_per_year_asc.json';
import ipdopd_sum_insured_per_year_desc from './test-data/ipdopd_sum_insured_per_year_desc.json';
import hotdeal_unsorted from './test-data/hotdeal_unsorted.json';
import hotdeal_sorted from './test-data/hotdeal_sorted.json';
import bestseller_unsorted from './test-data/bestseller_unsorted.json';
import bestseller_sorted from './test-data/bestseller_sorted.json';

import sortAndFilter from './sortAndFilter';
const leadInfo = {
  ipdopd: {
    product_category: 'ipdOpd'
  },
  disease: {
    product_category: 'disease'
  }
}
test('It sorts packages by premium,  ASC[min to max]', () => {
  const config = {
    sortBy: 'premium_min-max',
    direction: 'ASC',
  };
  const sorted = sortAndFilter(premiumUnsorted, config, leadInfo.disease);
  expect(sorted).toEqual(premiumSortedAsc);
});

test('It sorts packages by premium,  DESC[max to min]', () => {
  const config = {
    sortBy: 'premium_max-min',
    direction: 'DESC',
  };
  const sorted = sortAndFilter(premiumUnsorted, config, leadInfo.disease);
  expect(sorted).toEqual(premiumSortedDesc);
});

test('It sorts packages by ipdopd_sum_insured_per_year ASC[min to max]', () => {
  const config = {
    sortBy: 'ipdopd_sum_insured_per_year_min-max',
  };
  const sorted = sortAndFilter(sumInsuredUnsorted, config, leadInfo.ipdopd);
  expect(sorted).toEqual(ipdopd_sum_insured_per_year_asc);
});

test('It sorts packages by ipdopd_sum_insured_per_year DESC[max to min]', () => {
  const config = {
    sortBy: 'ipdopd_sum_insured_per_year_max-min',
  };
  const sorted = sortAndFilter(sumInsuredUnsorted, config, leadInfo.ipdopd);
  expect(sorted).toEqual(ipdopd_sum_insured_per_year_desc);
});

test('It filters packages by premium value', () => {
  const config = {
    premium: { min: 11000, max: 11000 },
  };

  let filtered = sortAndFilter(packages, config);
  expect(filtered.length).toEqual(1);
});

test('It filters packages by product category.', () => {
  const config = {
    category: 'ipdOpd',
  };

  let filtered = sortAndFilter(packages, config);
  expect(filtered.length).toEqual(21);
});

// sub-category filter was disabled by this commit -> 287e329b90818d9e6d3df6bfb00a6be096062f58
// test('It filters packages by product sub category.', () => {
//   const config = {
//     subCategory: 'salaryMan',
//   };
//
//   let filtered = sortAndFilter(packages, config);
//   expect(filtered.length).toEqual(10);
// });

test('It filters packages by insurer', () => {
  const config = {
    insurer: {
      insurer_1: true,
      insurer_2: true,
      insurer_3: false,
    },
  };

  let filtered = sortAndFilter(packages, config);
  expect(filtered.length).toEqual(2);
});

test('It filters packages by features', () => {
  const config = {
    features: {
      'Loss of life compensation': true,
    },
  };

  let filtered = sortAndFilter(packages, config);
  expect(filtered.length).toEqual(12);
});

test('It groups packages by hot deal', () => {
  const config = {
    quickFilter: 'hotDeal',
  };
  expect(hotdeal_sorted).toEqual(sortAndFilter(hotdeal_unsorted, config));
});

test('It groups packages by best seller', () => {
  const config = {
    quickFilter: 'bestSeller',
  };
  expect(bestseller_sorted).toEqual(sortAndFilter(bestseller_unsorted, config));
});
