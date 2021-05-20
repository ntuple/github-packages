import { useTranslation } from 'next-translate';

const useSingleChoiceSorter = () => {
  const { t } = useTranslation();

  const sortByTransLabel = (items, direction = 'ASC') => {
    return items.sort((a, b) => {
      if (direction === 'DESC') {
        return -1 * a['transLabel'].localeCompare(b['transLabel']);
      }
      return a['transLabel'].localeCompare(b['transLabel']);
    });
  };

  const sortChoices = (options, sortOrder) => {
    if (sortOrder == null) return options;

    const filterCriteria = (opt) => {
      return opt.isPlaceHolder || opt.value == '0';
    };

    //add translabel to use localCompare
    options = options.map((opt) => {
      return { ...opt, transLabel: t(opt.label) };
    });

    const unSortableItems = options.filter((opt) => filterCriteria(opt));
    const sortableItems = options.filter((opt) => !filterCriteria(opt));

    const sortedItems = sortByTransLabel(
      sortableItems,
      sortOrder.toUpperCase()
    );

    return unSortableItems.concat(sortedItems);
  };

  return { sortChoices };
};

export default useSingleChoiceSorter;
