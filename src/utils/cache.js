/**
 * cache management for results
 *
 * @export
 * @class Cache
 */
export default class Cache {

    constructor() {
        this.cacheStorage = {}
    }

    /**
     * check the request url if it is available on cache storage or store it and return json
     *
     * @param {string} requestUrl url of api request with all querystring parameters
     * @param {object} resultJSON result object to store as value
     * @returns object
     * @memberof Cache
     */
    manageCache(requestUrl, resultJSON) {
        if (this.cacheStorage[requestUrl] != undefined && this.cacheStorage[requestUrl] != '') {
            return this.cacheStorage[requestUrl]
        } else {
            this.cacheStorage[requestUrl] = resultJSON
        }

        return this.cacheStorage[requestUrl]
    }

    /**
     * check cache and return stored data
     *
     * @param {string} requestUrl url of api request with all querystring parameters
     * @returns json
     * @memberof Cache
     */
    checkCache(requestUrl) {
        if (this.cacheStorage[requestUrl] != undefined && this.cacheStorage[requestUrl] != '') {
            return this.cacheStorage[requestUrl]
        }
        return false
    }

    /**
     * clear all cached request result
     *
     * @memberof Cache
     */
    clear() {
        this.cacheStorage = {}
    }

}