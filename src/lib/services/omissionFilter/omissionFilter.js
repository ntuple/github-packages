import { flatten } from '../../object';
import { groupBy } from '../../array';

/**
 * Select cheaper package by comparing invoice price.
 * @param x package 1
 * @param y package 2
 *
 * @returns {Object} package
 */
const cheapestPrice = (x, y) => {
  if (y == null) {
    return x;
  }
  return x.invoice_price <= y.invoice_price ? x : y;
};

/**
 * Apply omission logic to type 1 and type1 low cost
 * @param {Object[]} packages
 * @param {boolean} isLowCost
 */
export const filterType1 = (packages, isLowCost = false) => {
  //filter Type 1 packages
  let typeFilteredPacks = packages.filter(
    (pack) =>
      pack.car_insurance_type === 'Type 1' && pack.is_low_cost === isLowCost
  );

  let companyPackages = groupBy(typeFilteredPacks, 'insurance_company_id');

  const maximumDeductible = (x, y) => {
    if (y == null) {
      return x;
    }
    return x.deductible_amount >= y.deductible_amount ? x : y;
  };

  Object.entries(companyPackages).forEach(([companyId, items]) => {
    // res[0] 1 garage with highest deductible (per insurer)
    // res[1] 1 dealer with highest deductible (per insurer)
    // res[2] 1 garage (per insurer) without deductible
    // res[3] 1 dealer (per insurer) without deductible
    let res = [null, null, null, null];

    items.forEach((item) => {
      if (item.car_repair_type === 'Garage') {
        if (item.deductible_amount) {
          res[0] = maximumDeductible(item, res[0]);
        } else {
          res[2] = cheapestPrice(item, res[2]);
        }
      }
      if (item.car_repair_type === 'Dealer') {
        if (item.deductible_amount) {
          res[1] = maximumDeductible(item, res[1]);
        } else {
          res[3] = cheapestPrice(item, res[3]);
        }
      }
    });
    companyPackages[companyId] = res.filter((r) => r !== null);
  });

  return flatten(companyPackages);
};

/**
 * Filter type 2+ or 3+ packages
 * @param {Object[]} packages
 * @param {Object} config
 * @param {number} config.carSumInsured
 */
export const filterType2p3p = (packages, { carSumInsured }) => {
  const maxSumInsured = Math.floor(0.6 * carSumInsured);
  let filteredItems = [];

  const lowestDeductible = (x, y) => {
    if (y == null) {
      return x;
    }

    if (x.deductible_amount === y.deductible_amount) {
      return cheapestPrice(x, y);
    }

    return x.deductible_amount < y.deductible_amount ? x : y;
  };

  // Filter Type2+ or Type3+ packages
  // Sum coverage must be below max sum insured of a car and matching 100k steps
  let typeFilteredPacks = packages.filter(
    (pack) =>
      ['Type 2+', 'Type 3+'].includes(pack.car_insurance_type) &&
      pack.sum_coverage <= maxSumInsured &&
      pack.sum_coverage % 100000 == 0
  );

  let insurerPackages = groupBy(typeFilteredPacks, 'insurance_company_id');

  Object.values(insurerPackages).forEach((items) => {
    Object.values(groupBy(items, 'sum_coverage')).forEach((items) => {
      // Group by sum coverage
      // res[0] 1 lowest deductible and lowest invoice price
      // res[1] 1 garage -> lowest invoice price without deductible
      // res[2] 1 dealer -> lowest invoice price without deductible
      let res = [null, null, null];

      items.forEach((item) => {
        if (item.deductible_amount) {
          res[0] = lowestDeductible(item, res[0]);
        } else {
          if (item.car_repair_type === 'Garage') {
            res[1] = cheapestPrice(item, res[1]);
          }
          if (item.car_repair_type === 'Dealer') {
            res[2] = cheapestPrice(item, res[2]);
          }
        }
      });

      res.forEach((item) => (item ? filteredItems.push(item) : ''));
    });
  });

  return filteredItems;
};

/**
 * Filters type 2 packages
 * @param {Object[]} packages
 */
export const filterType2 = (packages) => {
  let typeFilteredPacks = packages.filter(
    (pack) => pack.car_insurance_type === 'Type 2'
  );

  let companyPackages = groupBy(typeFilteredPacks, 'insurance_company_id');

  Object.entries(companyPackages).forEach(([companyId, items]) => {
    // res[0] 1 garage cheapest premium per insurer
    // res[1] 1 dealer cheapest premium per insurer
    let res = [null, null];
    items.forEach((item) => {
      if (item.car_repair_type === 'Garage') {
        res[0] = cheapestPrice(item, res[0]);
      }
      if (item.car_repair_type === 'Dealer') {
        res[1] = cheapestPrice(item, res[0]);
      }
    });
    companyPackages[companyId] = res.filter((r) => r !== null);
  });
  return flatten(companyPackages);
};

/**
 * @param {Object[]} packages
 */
export const filterType3 = (packages) => {
  let typeFilteredPacks = packages.filter(
    (pack) => pack.car_insurance_type === 'Type 3'
  );
  let companyPackages = groupBy(typeFilteredPacks, 'insurance_company_id');

  Object.entries(companyPackages).forEach(([companyId, items]) => {
    // res[0] 1 cheapest premium per insurer
    let res = [null];
    items.forEach((item) => {
      res[0] = cheapestPrice(item, res[0]);
    });
    companyPackages[companyId] = res.filter((r) => r !== null);
  });
  return flatten(companyPackages);
};

/**
 * @param {Object[]} packages
 */
const filterMandatory = (packages) =>
  packages.filter((pack) => pack.car_insurance_type === 'mandatory');

/**
 * Omission Logic Handler
 * @param {Object[]} packages
 * @param {Object} config
 */
export const omissionFilter = (packages, config) => {
  return [
    ...filterType1(packages),
    ...filterType1(packages, true), // low cost
    ...filterType2p3p(packages, config),
    ...filterType2(packages),
    ...filterType3(packages),
    ...filterMandatory(packages),
  ];
};
