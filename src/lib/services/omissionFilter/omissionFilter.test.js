import { test, expect } from '@jest/globals';
import packages_1 from '../../../data/test/omission/packages_1.json';
import packages_1_expected from '../../../data/test/omission/packages_1_expected.json';
import packages_1_low_cost from '../../../data/test/omission/packages_1_low_cost.json';
import packages_1_low_cost_expected from '../../../data/test/omission/packages_1_low_cost_expected.json';
import packages_2p from '../../../data/test/omission/packages_2p.json';
import packages_2p_expected from '../../../data/test/omission/packages_2p_expected.json';
import packages_2 from '../../../data/test/omission/packages_2.json';
import packages_2_expected from '../../../data/test/omission/packages_2_expected.json';
import packages_3 from '../../../data/test/omission/packages_3.json';
import packages_3_expected from '../../../data/test/omission/packages_3_expected.json';

import {
  filterType1,
  filterType2,
  filterType2p3p,
  filterType3,
  omissionFilter,
} from './omissionFilter';

test('Should filter packages by Type 1 (Low Cost)', () => {
  let items = filterType1(packages_1);

  expect(items).toEqual(packages_1_expected);
});

test('Should filter package: Type 2+, Type 3+', () => {
  // Logic is same for Type 2+ and Type 3+
  // Only type is different
  let items = filterType2p3p(packages_2p, { carSumInsured: 1000000 });

  expect(items).toEqual(packages_2p_expected);
});

test('Should filter packages by Type 2', () => {
  let items = filterType2(packages_2);

  expect(items).toEqual(packages_2_expected);
});

test('Should filter packages by Type 3', () => {
  let items = filterType3(packages_3);

  expect(items).toEqual(packages_3_expected);
});

test('Should filter all types of packages', () => {
  const packages = [
    ...packages_1,
    ...packages_1_low_cost,
    ...packages_2p,
    ...packages_2,
    ...packages_3,
    { id: 1, car_insurance_type: 'mandatory' },
  ];
  const expected = [
    ...packages_1_expected,
    ...packages_1_low_cost_expected,
    ...packages_2p_expected,
    ...packages_2_expected,
    ...packages_3_expected,
    { id: 1, car_insurance_type: 'mandatory' },
  ];

  let items = omissionFilter(packages, { carSumInsured: 1000000 });

  expect(items).toEqual(expected);
});
