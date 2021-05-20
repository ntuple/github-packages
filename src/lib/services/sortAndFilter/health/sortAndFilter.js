import { flatten, isKeySet } from '../../../object';
import { groupBy } from '../../../array';

/**
 * Return common elements in two array
 * @param {array} items1
 * @param {array} items2
 */
function intersect(items1, items2) {
  const res = [];
  items1.forEach((item1) => {
    items2.forEach((item2) => {
      item1 === item2 && res.push(item1);
    });
  });
  return res;
}

/**
 * Sorts packages by premium value
 * @param {array} packages
 * @param {string} key
 */
const sortByPremium = (packages, direction) => {
  return packages
    .filter((pack) => typeof pack.premium === 'number')
    .sort((pack1, pack2) => {
      if (direction == 'DESC') {
        return -1 * (pack1.premium - pack2.premium);
      }
      return pack1.premium - pack2.premium;
    });
};

/**
 * Sorts packages by coverage value
 * @param {array} packages
 * @param {string} key
 */
const sortByCoverageName = (packages, coverageName, direction) => {
  return packages
    .filter(
      (pack) =>
        isKeySet(pack.coverage, coverageName) &&
        pack.coverage[coverageName].limitValue
    )
    .sort((pack1, pack2) => {
      if (direction == 'DESC') {
        return (
          -1 *
          (pack1.coverage[coverageName].limitValue -
            pack2.coverage[coverageName].limitValue)
        );
      }
      return (
        pack1.coverage[coverageName].limitValue -
        pack2.coverage[coverageName].limitValue
      );
    });
};

/**
 * Sorts packages by brand or price
 * @param {array} packages
 * @param {object} config
 */
const sortItems = (packages, config, leadInfo) => {
  const { product_category } = leadInfo;
  const { fieldName, direction } = getFieldNameAndDirection(
    config,
    product_category
  );
  if (fieldName.includes('premium')) {
    packages = sortByPremium(packages, direction);
  } else {
    packages = sortByCoverageName(packages, fieldName, direction);
  }
  return packages;
};

/**
 * Get field name and direction based on config
 * @param {object} config
 */
const getFieldNameAndDirection = (config, category) => {
  const fieldName = getFieldName(config, category);
  const direction = getDirection(config);
  return { fieldName, direction };
};

/**
 * Get direction based on config
 * @param {object} config
 */
const getDirection = (config) => {
  const { sortBy } = config;
  if (sortBy.includes('min-max')) {
    return 'ASC';
  }
  return 'DESC';
};

/**
 * Get field name based on config and category
 * @param {object} config
 * @param string category
 */
const getFieldName = (config, category) => {
  const { sortBy } = config;
  if (sortBy.includes('premium')) {
    return 'premium';
  }

  if (category === 'ipdOpd') {
    if (sortBy.includes('sum_insured')) {
      return 'ipdopd_sum_insured_per_year';
    }
    if (sortBy.includes('ipdopd_non_intensive_care')) {
      return 'ipdopd_non_intensive_care';
    }
    if (sortBy.includes('ipdopd_hospital_expense')) {
      return 'ipdopd_hospital_expense';
    }
  }

  if (sortBy.includes('ci_max_coverage') && category === 'disease') {
    return 'ci_max_coverage';
  }

  if (sortBy.includes('pa_max_coverage') && category === 'pa') {
    return 'pa_max_coverage';
  }
};
/**
 * Filter packages by sum insured
 * @param {array} packages
 * @param {object} config
 * @param {object} leadInfo
 * @param {string} leadInfo.product_category
 */
const filterSumInsured = (packages, config, leadInfo) => {
  const { min, max } = config.sumInsured;
  const { product_category: category } = leadInfo;
  let fieldName = '';
  switch (category) {
    case 'ipdOpd':
      fieldName = 'ipdopd_sum_insured_per_year';
      break;
    case 'disease':
      fieldName = 'ci_max_coverage';
      break;
    case 'pa':
      fieldName = 'pa_max_coverage';
      break;
    default:
      break;
  }
  return packages.filter((pack) => {
    if (pack.coverage[fieldName] && pack.coverage[fieldName].limitValue) {
      return (
        parseInt(pack.coverage[fieldName].limitValue) >= min &&
        parseInt(pack.coverage[fieldName].limitValue) <= max
      );
    }
    return pack; // will remove after api already has correct data;
  });
};

/**
 * Filter packages by premium
 * @param {array} packages
 * @param {object} config
 */
const filterPremium = (packages, config) => {
  const { min, max } = config.premium;

  return packages.filter(({ premium }) => premium >= min && premium <= max);
};

const filterCategory = (packages, config) => {
  return packages.filter(({ category }) => category === config.category);
};

const filterSubCategory = (packages, config) => {
  return packages.filter(
    ({ subCategory }) => subCategory == config.subCategory
  );
};

const filterShowOnly = (packages, config) => {
  return packages.filter(({ hotDeal, bestSeller }) => {
    if (config.insuranceType.hotDeal && !hotDeal) {
      return false;
    }

    if (config.insuranceType.bestSeller && !bestSeller) {
      return false;
    }

    return true;
  });
};

/**
 * Filter packages by insurer
 * @param {array} packages
 * @param {object} config
 */
const filterInsurer = (packages, config) => {
  const selectedInsurer = [];
  // convert hash to array
  Object.entries(config.insurer).map(
    ([name, value]) => value && selectedInsurer.push(name)
  );

  return packages.filter((pack) => {
    return selectedInsurer.includes(pack.insurer.code);
  });
};

const filterFeatures = (packages, config) => {
  const selectedFeatures = [];
  // convert hash to array
  Object.entries(config.features).map(
    ([name, value]) => value && selectedFeatures.push(name)
  );

  return packages.filter((pack) => {
    if (pack.features.length === 0) {
      return pack;
    }

    return intersect(pack.features, selectedFeatures).length > 0;
  });
};

/**
 * Group packages by hotDeal/Best seller
 * @param {array} packages
 * @param {object} config
 */
const quickFilter = (packages, config) => {
  return flatten(groupBy(packages, config.quickFilter));
};

/**
 * Sort and filter packages for given config
 * @param {array} packages
 * @param {object} config
 */
const sortAndFilter = (packages, config, leadInfo) => {
  let items = packages;
  if (config.sortBy) {
    items = sortItems(items, config, leadInfo);
  }

  if (config.premium) {
    items = filterPremium(items, config);
  }

  if (config.sumInsured) {
    items = filterSumInsured(items, config, leadInfo);
  }

  if (config.category) {
    items = filterCategory(items, config);
  }

  if (config.insuranceType) {
    items = filterShowOnly(items, config);
  }

  // @todo removed until we solve multiple sub categoriesß
  // if (config.subCategory) {
  //   items = filterSubCategory(items, config);
  // }

  if (config.insurer) {
    items = filterInsurer(items, config);
  }

  if (config.features) {
    items = filterFeatures(items, config);
  }

  if (config.quickFilter) {
    items = quickFilter(items, config);
  }
  return items;
};

export default sortAndFilter;
