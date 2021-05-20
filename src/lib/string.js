/**
 * Convert a string to snake case
 *
 * @param str
 * @returns {*}
 */
export const toSnakeCase = (str) =>
  str &&
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map((x) => x.toLowerCase())
    .join('_');

export const toKebabCase = (str) =>
  str &&
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map((x) => x.toLowerCase())
    .join('-');

/**
 * Normalize a string
 *
 * Converts to lowercase and replaces any spaces with underscore
 *
 * @param str
 * @returns {string}
 */
export const normalizeString = (str) => {
  return str.toLowerCase().replace(' ', '_');
};

/**
 * Check if variable is a string
 *
 * @param str
 * @returns {boolean}
 */
export const isString = (str) => {
  return typeof str === 'string';
};
