import isEqual from 'lodash.isequal';
import { omissionFilter } from '../../omissionFilter/omissionFilter';

/**
 * Sorts packages by type
 * @param {array} packages
 * @param {string} key
 */
const sortBy = (packages, key) => {
  return packages.sort((pack1, pack2) => {
    if (pack1[key] > pack2[key]) return 1;
    if (pack1[key] < pack2[key]) return -1;
    return 0;
  });
};

/**
 * Group packages by their type
 * @param {array} package
 */
const groupByType = (packages) => {
  let groups = {};
  packages.forEach((pack) => {
    if (!groups[pack.car_insurance_type]) {
      groups[pack.car_insurance_type] = [];
    }
    groups[pack.car_insurance_type].push(pack);
  });

  let ordered = {};
  Object.keys(groups)
    .sort()
    .map((key) => {
      ordered[key] = groups[key];
    });
  return Object.values(ordered);
};

/**
 * Group packages by brand
 * @param {array} packages
 */
const groupByBrand = (packages) => {
  let groups = {};
  packages.forEach((pack) => {
    if (!groups[pack.rank]) {
      groups[pack.rank] = [];
    }
    groups[pack.rank].push(pack);
  });

  let ordered = {};
  Object.keys(groups)
    .sort()
    .map((key) => {
      ordered[key] = groups[key];
    });

  return Object.values(ordered);
};

/**
 * Sorts packages by brand or price
 * @param {array} packages
 * @param {object} config
 */
const sortItems = (packages, config) => {
  if (config.sortBy == 'price') {
    let groups = groupByType(packages);

    groups.forEach((group, index) => {
      groups[index] = sortBy(group, 'invoice_price');
    });
    return groups.flat();
  }

  if (config.sortBy == 'brand') {
    let groupsByBrand = groupByBrand(packages);

    groupsByBrand.forEach((group, index1) => {
      let groupsByType = groupByType(group);
      groupsByType.forEach((groupByType, index2) => {
        groupsByType[index2] = sortBy(groupByType, 'invoice_price');
      });
      groupsByBrand[index1] = groupsByType;
    });

    return groupsByBrand.flat().flat();
  }
  return packages;
};

const getTypeList = (typeList) => {
  let tempTypes = [];

  typeList.forEach((type) => {
    if (type.indexOf('/') > 0) {
      //if the string contains a / its composite type
      switch (type) {
        case 'Type 2+/3+':
          tempTypes = [...tempTypes, 'Type 2+', 'Type 3+'];
          break;
        case 'Type 2/3':
          tempTypes = [...tempTypes, 'Type 2', 'Type 3'];
          break;
      }
    } else {
      tempTypes = [...tempTypes, type];
    }
  });
  return tempTypes;
};

/**
 * Filter packages by insurance type
 * @param {array} packages
 * @param {object} config
 */
const filterInsuranceType = (packages, config) => {
  let selectedTypes = [];
  //convert hash to array
  Object.entries(config.insuranceType).map(
    ([name, value]) => value && selectedTypes.push(name)
  );

  const typeList = getTypeList(selectedTypes);

  return packages.filter((item) => {
    return typeList.includes(item.car_insurance_type);
  });
};

/**
 * Filter packages by insurance category
 * @param {array} packages
 * @param {object} config
 */
const filterInsuranceCategory = (packages, config) => {
  if (config.insuranceCategory == 'both') {
    return packages;
  }
  return packages.filter((item) => {
    return item.insurance_category == config.insuranceCategory;
  });
};

/**
 * Filter packages by insurance repair type
 * @param {array} packages
 * @param {object} config
 */
const filterRepairType = (packages, config) => {
  if (config.repairType == 'both') {
    return packages;
  }

  return packages.filter((item) => {
    return item.car_repair_type.toLowerCase() == config.repairType;
  });
};

/**
 * Filter packages by deductible
 * @param {array} packages
 * @param {object} config
 */
const filterDeductible = (packages, config) => {
  if (config.deductible === 'all_packages') {
    return packages;
  }

  if (config.deductible === 'only_deductible') {
    return packages.filter((pack) => pack.deductible_amount > 0);
  }

  if (config.deductible === 'no_deductible') {
    return packages.filter((pack) => !(pack.deductible_amount > 0));
  }

  return packages;
};

/**
 * @param {array} packages
 * @param {object} config
 */
const filterDriver = (packages, config) => {
  if (config.driver === 'all_packages') {
    return packages;
  }

  if (config.driver === 'any_driver') {
    return packages.filter((pack) => {
      return !(
        pack.is_fixed_premium == false && pack.car_insurance_type == 'Type 1'
      );
    });
  }

  if (config.driver === 'named_driver') {
    return packages.filter((pack) => {
      return (
        pack.is_fixed_premium == false && pack.car_insurance_type == 'Type 1'
      );
    });
  }

  return packages;
};

/**
 * Filter packages by sum insured
 * @param {array} packages
 * @param {object} config
 */
const filterSumInsured = (packages, config) => {
  const { min, max } = config.sumInsured;

  return packages.filter(
    ({ sum_coverage }) =>
      (sum_coverage >= min && sum_coverage <= max) ||
      sum_coverage == 0 ||
      sum_coverage == null
  );
};

/**
 * Filter packages by insurer
 * @param {array} packages
 * @param {object} config
 */
const filterInsurer = (packages, config) => {
  let selectedInsurer = [];
  //convert hash to array
  Object.entries(config.insurer).map(
    ([name, value]) => value && selectedInsurer.push(parseInt(name))
  );

  return packages.filter((pack) => {
    return selectedInsurer.includes(pack.insurance_company.id);
  });
};

/**
 * Sorts and filter packages for given config
 * @param {array} packages
 * @param {object} config - Current filter values
 * @param {object} defaultValues - Default filter values
 * @param {object} leadInfo
 */
const sortAndFilter = (packages, config, defaultValues, leadInfo) => {
  let items = packages;

  if (isEqual(config, defaultValues)) {
    items = omissionFilter(items, {
      carSumInsured: leadInfo.car.sum_insured,
    });
  }

  if (config.sortBy) {
    items = sortItems(items, config);
  }

  if (config.insuranceCategory) {
    items = filterInsuranceCategory(items, config);
  }

  if (config.insuranceCategory !== 'mandatory' && config.insuranceType) {
    items = filterInsuranceType(items, config);
  }

  if (config.repairType) {
    items = filterRepairType(items, config);
  }

  if (config.deductible) {
    items = filterDeductible(items, config);
  }

  if (config.driver) {
    items = filterDriver(items, config);
  }

  if (config.sumInsured) {
    items = filterSumInsured(items, config);
  }

  if (config.insurer) {
    items = filterInsurer(items, config);
  }

  return items;
};

export default sortAndFilter;
