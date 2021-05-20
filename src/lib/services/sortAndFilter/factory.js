import motorConfig from './motor/config';
import healthConfig from './health/config';
import healthSortAndFilter from './health/sortAndFilter';
import motorSortAndFilter from './motor/sortAndFilter';

export const getConfig = (type) => {
  switch (type) {
    case 'motor':
      return motorConfig;
    case 'health':
      return healthConfig;
  }

  return {
    sort: {},
    quickFilter: [],
    filters: [],
  };
};

export const sortAndFilter = (
  type,
  apiPackages,
  filterValues,
  defaultFilterValues,
  leadInfo
) => {
  switch (type) {
    case 'motor':
      return motorSortAndFilter(
        apiPackages,
        filterValues,
        defaultFilterValues,
        leadInfo
      );
    case 'health':
      return healthSortAndFilter(apiPackages, filterValues, leadInfo);
  }

  return apiPackages;
};
