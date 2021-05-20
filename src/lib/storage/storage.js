import LZString from 'lz-string';
import Bugsnag from 'lib/bugsnag';
import { isValid, millisec } from '../util';

const { compress, decompress } = LZString;
const namespacePrefix = 'rf';
const indexName = 'rfIndex';
const _options = new WeakMap();

export default class Storage {
  /**
   * @constructor
   * @param {Object} options
   * @param {string} options.appName      Name of the application
   * @param {Object} options.defaults     Map of default values, if any
   */
  constructor(options = {}) {
    _options.set(this, options);
  }

  /**
   * Returns the final key used for storing the
   * value in the `localStorage`.
   *
   * @param  {string} key     Storage key
   * @return {string} The generated key name for the app
   */
  getKey(key) {
    const { appName } = _options.get(this);
    return `${namespacePrefix}/${appName}/${key}`;
  }

  /**
   * Sets a given key and value in the `localStorage`.
   * Uses lz-string compression before storage.
   *
   * @param {string}  key           Storage key
   * @param {mixed}   value         Value to store
   * @param {Object}  config        Value config
   * @param {boolean} config.flash  Should we flush the value each time it's fetched
   * @param {number}  config.hours  How many hours it should live for
   */
  set(key, value, config = { flash: false, hours: -1 }) {
    const itemKey = this.getKey(key);
    try {
      const myData = {
        updated_at: new Date(),
        data: value,
        config,
      };
      const val = JSON.stringify(myData);
      if (typeof val !== 'undefined') {
        localStorage.setItem(itemKey, compress(val));
        this.addToIndex(key);
      }
    } catch (ex) {
      Bugsnag.notify(ex);
      console.warn(
        `something went wrong while trying to store value for ${key}.`,
        ex
      ); // eslint-disable-line no-console
    }
  }

  /**
   * Retrieves the value from the `localStorage`.
   * Assumes that provided `set` method of the storage
   * was used to begin with, as the value is decompressed
   * using the lz-string compression.
   *
   * @param {string} key  Storage key
   * @return {mixed}      Stored Value
   */
  get(key) {
    const itemKey = this.getKey(key);
    const item = localStorage.getItem(itemKey);

    // return default value
    if (!isValid(item)) {
      return this.getDefaultValue(key);
    }

    const decompressedItem = decompress(item);
    let storedObject;

    try {
      storedObject = JSON.parse(decompressedItem);
    } catch (ex) {
      Bugsnag.notify(ex);
      storedObject = decompressedItem;
    }

    // This is because we might have people who have old data saved which isn't compressed
    if (!isValid(storedObject)) {
      return this.getDefaultValue(key);
    }

    if (storedObject['config']['flash']) {
      this.remove(key);
      return storedObject['data'];
    }

    let validHours = storedObject['config']['hours'];

    if (validHours !== -1) {
      const diff = Date.now() - new Date(storedObject['updated_at']);

      if (diff >= millisec(validHours)) {
        this.remove(key);
        return null;
      }
      return storedObject['data'];
    }

    return storedObject['data'];
  }

  /**
   * Removes the given key(s) from the storage.
   *
   * @param  {String|Array<String>} keys  Key(s) to remove from storage
   */
  remove(keys) {
    if (!Array.isArray(keys)) keys = [keys]; // eslint-disable-line no-param-reassign
    keys.forEach((k) => localStorage.removeItem(this.getKey(k)));
    this.removeFromIndex(keys);
  }

  /**
   * Flush all the keys from this namespace
   */
  flush() {
    const index = this.getIndex();

    this.remove(index);
    this.setIndex([]);
  }

  /**
   * Get the Key name for this namespace's key index
   *
   * @returns {string}
   */
  getIndexName() {
    const { appName } = _options.get(this);

    return `${indexName}/${appName}`;
  }

  /**
   * Get the Namespace key index
   *
   * @returns {string|*[]}
   */
  getIndex() {
    const index = localStorage.getItem(this.getIndexName());
    return index ? JSON.parse(index) : [];
  }

  /**
   * Set the Namespace key index
   *
   * @param index
   */
  setIndex(index) {
    localStorage.setItem(this.getIndexName(), JSON.stringify(index));
  }

  /**
   * Remove a key or keys from the index
   *
   * @param {String|Array<String>} keys
   */
  removeFromIndex(keys) {
    if (!Array.isArray(keys)) keys = [keys];
    const index = this.getIndex();

    this.setIndex(index.filter((indexItem) => !keys.includes(indexItem)));
  }

  /**
   * Add a key to the index
   *
   * @param {string} key
   */
  addToIndex(key) {
    const index = this.getIndex();

    if (!index.includes(key)) {
      index.push(key);
      this.setIndex(index);
    }
  }

  getDefaultValue(key) {
    const { defaults = {} } = _options.get(this);
    return defaults[key] ? defaults[key] : null;
  }
}
