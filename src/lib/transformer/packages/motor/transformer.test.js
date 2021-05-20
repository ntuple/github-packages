import { expect, test } from '@jest/globals';
import Transformer from './transformer';
import response from '../../../../data/packages.json';
import expectedSortFilterConfig from '../../../../data/test/sortFilterConfig.json';

const lead = {
  car: { brand: 'Toyota', model: 'Vios', year: 2017, sum_insured: 456000 },
  insurance_kind: 'voluntary',
  insurance_voluntary: ['Type 1'],
};

test('It should build and return the correct filter configuration ', () => {
  const transformer = new Transformer();

  expect(transformer.transformFilterSortConfig(lead, response).filters).toEqual(
    expectedSortFilterConfig.filters
  );
});
