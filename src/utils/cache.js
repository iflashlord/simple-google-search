/**
 * cache management for results
 *
 * @export
 * @class Cache
 */
export default class Cache {

    constructor() {
        this.storage = {}
    }

    /**
     * check the request URL if it is available on cache storage or store it and return JSON
     *
     * @param {string} request URL of an API request with all query string parameters
     * @param {object} result result object to save
     * @returns object
     * @memberof Cache
     */
    store(request, result) {
        if (!this.storage[request]) {
            this.storage[request] = result
        }

        return this.storage[request]
    }

    /**
     * retrieve data if available
     *
     * @param {string} requestUrl url of api request with all querystring parameters
     * @returns json or null if it is not exist
     * @memberof Cache
     */
    retrieve(requestUrl) {
        return this.storage[requestUrl] || null
    }

    /**
     * clear the storage
     *
     * @memberof Cache
     */
    clear() {
        this.storage = {}
    }

}