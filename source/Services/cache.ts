import * as Promise from 'bluebird';
import * as Debug from 'debug';

const logger = Debug('app:InMemoryCache');

/**
 *
 *
 * @class InMemoryCache
 *
 * For caching the key values
 *
 */
class InMemoryCache {
  static cached: any = {};

  /**
   * Creates an instance of InMemoryCache.
   * @param {string} db
   * @memberOf InMemoryCache
   *
   * creating a subobject on static cached object of InMemoryCache with key as db.
   *
   * InMemoryCache.cache = {
   *    db1: {
   *      xyz: <anyhting>
   *     },
   *    db2: {
   *      pqr: <anything>
   *    }
   *     ......
   * };
   *
   */
  constructor(private db: string) {
    if (!InMemoryCache.cached[this.db]) {
      InMemoryCache.cached[this.db] = {};
    }
  }



  /**
   *
   *
   * @param {string} key
   * @returns {Promise<any>}
   *
   * @memberOf InMemoryCache
   *
   * trying to get the key from cache with current db selected on instance.
   */
  get(key: string): Promise<any> {
    return new Promise((resolve, reject) => {
      if (key in InMemoryCache.cached[this.db]) {
        logger(`hit for ${key} in ${this.db}`);
        return resolve(InMemoryCache.cached[this.db][key]);
      }
      logger(`miss for ${key} in ${this.db}`);
      return reject(new Error(`Cache not available for ${this.db}.${key}`));
    });
  }

  /**
   *
   *
   * @param {string} key
   * @param {*} value
   * @returns {Promise<any>}
   *
   * @memberOf InMemoryCache
   * sets the new value to the key or creating that new key
   * in specified database through instance.
   *
   */
  set(key: string, value: any): Promise<any> {
    return new Promise((resolve, reject) => {
      InMemoryCache.cached[this.db][key] = value;
      resolve(value);
    });
  }

}

export { InMemoryCache };
