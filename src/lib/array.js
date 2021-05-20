export const range = (min, max) => {
  const range = [];
  for (let i = min; i <= max; i++) {
    range.push(i);
  }
  return range;
};

/**
 * Sort and array of objects based on field value
 * @param {Object} items
 * @param {string} fieldName
 * @param {('ASC'|'DESC')} direction
 */
export const sortBy = (items, fieldName, direction = 'ASC') => {
  return items.sort((item1, item2) => {
    if (isNaN(item1[fieldName])) {
      throw new Error(`${typeof item1[fieldName]} not supported!`);
    }
    if (direction === 'DESC') {
      return -1 * (item1[fieldName] - item2[fieldName]);
    }
    //default asc
    return item1[fieldName] - item2[fieldName];
  });
};

/**
 * Group an array of objects by matching property
 * @param {Object[]} items
 * @param {string} fieldName - object property to group by
 */
export const groupBy = (items, fieldName) => {
  let groupedItems = {};

  items.forEach((item) => {
    let temp = item[fieldName];
    if (groupedItems[temp] === undefined) {
      groupedItems[temp] = [];
    }
    groupedItems[temp].push(item);
  });
  return groupedItems;
};

/**
 * Sort and array of objects based on field value
 * @param {Object} items
 * @param {string} fieldName
 * @param {('ASC'|'DESC')} direction
 */
export const sortByLocaleCompare = (items, fieldName, direction = 'ASC') => {
  return items.sort((item1, item2) => {
    if (direction === 'DESC') {
      return -1 * item1[fieldName].localeCompare(item2[fieldName]);
    }
    //default asc
    return item1[fieldName].localeCompare(item2[fieldName]);
  });
};
