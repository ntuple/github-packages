import { expect, test } from '@jest/globals';
import packages from './test-data/packages.json';
import priceUnsorted from './test-data/priceSorted.json';
import priceSorted from './test-data/priceSorted.json';
import rankUnsorted from './test-data/rankUnsorted.json';
import rankSorted from './test-data/rankSorted.json';

import sortAndFilter from './sortAndFilter';

const apiPackages = packages;

test('It sorts packages by price [sorted by type, then price]', () => {
  const config = {
    sortBy: 'price',
  };

  expect(sortAndFilter(priceUnsorted, config)).toEqual(priceSorted);
});

test('It sorts packages by brand [sorted by brand, then type, then price]', () => {
  const config = {
    sortBy: 'brand',
  };

  expect(sortAndFilter(rankUnsorted, config)).toEqual(rankSorted);
});

test('It filter packages by type for Type 1', () => {
  const config = {
    insuranceType: {
      'Type 1': true,
      'Type 2/3': false,
      'Type 2+/3+': false,
    },
  };
  //there is one package with type 1
  expect(sortAndFilter(apiPackages, config).length).toEqual(1);
});

test('It filter packages by type for Type 2/3', () => {
  const config = {
    insuranceType: {
      'Type 1': false,
      'Type 2/3': true,
      'Type 2+/3+': false,
    },
  };
  //  Type 2: 16,  and Type 3: 3
  expect(sortAndFilter(apiPackages, config).length).toEqual(19);
});

test('It filter packages by type for Type 2+/3+', () => {
  const config = {
    insuranceType: {
      'Type 1': false,
      'Type 2/3': false,
      'Type 2+/3+': true,
    },
  };
  //Type 2+: 15 , Type 3+: 5
  expect(sortAndFilter(apiPackages, config).length).toEqual(20);
});

test('It filter packages by type for Type1, Type 2/3, Type 2+/3+', () => {
  const config = {
    insuranceType: {
      'Type 1': true,
      'Type 2/3': true,
      'Type 2+/3+': true,
    },
  };
  expect(sortAndFilter(apiPackages, config).length).toEqual(40);
});

test('It filters packages by insurance type voluntary, both, mandatory', () => {
  expect(
    sortAndFilter(apiPackages, {
      insuranceCategory: 'voluntary',
    }).length
  ).toEqual(40);
});

test('It filters packages by repairType Garage , Dealer, Both', () => {
  expect(sortAndFilter(apiPackages, { repairType: 'garage' }).length).toEqual(
    33
  );
  expect(sortAndFilter(apiPackages, { repairType: 'dealer' }).length).toEqual(
    7
  );
  expect(sortAndFilter(apiPackages, { repairType: 'both' }).length).toEqual(40);
});

test('It filters packages by deductible no_deductible, only_deductible, all_packages', () => {
  expect(
    sortAndFilter(apiPackages, { deductible: 'all_packages' }).length
  ).toEqual(40);

  expect(
    sortAndFilter(apiPackages, { deductible: 'only_deductible' }).length
  ).toEqual(11);

  expect(
    sortAndFilter(apiPackages, { deductible: 'no_deductible' }).length
  ).toEqual(29);
});

test('It filters packages by driver all_packages, any_driver, named_driver', () => {
  //it shouldn't filter anything
  expect(
    sortAndFilter(apiPackages, {
      driver: 'all_packages',
    }).length
  ).toEqual(40);

  expect(
    sortAndFilter(apiPackages, {
      driver: 'any_driver',
    }).length
  ).toBe(39);

  expect(
    sortAndFilter(apiPackages, {
      driver: 'named_driver',
    }).length
  ).toBe(1);
});

test('It filters packages by sum insured', () => {
  const config = {
    sumInsured: { min: 49000, max: 55000 },
  };
  let filtered = sortAndFilter(apiPackages, config);
  // there are 3 items with sum-coverage 0 and one with 50000
  expect(filtered.length).toEqual(4);
});

test('It filters packages by insurer', () => {
  const config = {
    insurer: {
      '17': true,
      '18': false,
    },
  };

  let filtered = sortAndFilter(apiPackages, config);

  //there is only one insurance company with name id 17
  expect(filtered.length).toEqual(1);

  const config2 = {
    insurer: {
      '-1': true,
    },
  };

  let filtered2 = sortAndFilter(apiPackages, config2);

  //there should be no company with id -1
  expect(filtered2.length).toEqual(0);
});
