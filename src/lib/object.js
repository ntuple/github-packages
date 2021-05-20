export const isKeySet = (object, key) => {
  return Object.keys(object).includes(key);
};

export const isObject = (x) => x != null && typeof x === 'object';

export const flatten = (item) => {
  return Object.values(item).flat();
};
