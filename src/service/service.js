import Config from "../config/config.json"

/**
 * service class
 *
 * @export
 * @class Service
 */
export default class Service {

    constructor(searchFor, numberPerPage, startFrom) {
        this.searchFor = searchFor === "image" ? "image" : 0
        this.numberPerPage = numberPerPage || 6 // max is 10
        this.startFrom = startFrom
        this.imgSize = "medium"
        this.url = ""

        this.baseURL = Config.baseURL || ""
        this.googleAPIKey = Config.googleAPIKey || ""
        this.googleCX = Config.googleCX || ""
    }

    /**
     * generate url based on the API key
     *
     * @memberof Service
     */
    requestUrl() {
        let url = `${this.baseURL}?key=${this.googleAPIKey}&cx=${this.googleCX}&q=${encodeURIComponent(this.query)}&start=${this.startFrom}&num=${this.numberPerPage}&searchType=${this.searchFor}`

        // add a new item to query string if "searchFor" is an image
        if (this.searchFor === "image") {
            url += `&imgSize=${this.imgSize}`
        }

        this.url = url
    }

    /**
     * generate url and use fetch to HTTP request
     *
     * @returns promise
     * @memberof Service
     */
    request() {
        this.requestUrl()
        return fetch(this.url)
    }

    /**
     * update query with new one
     * reset page number (startFrom) to the first one
     *
     * @param {string} newQuery string to search on google
     * @memberof Service
     */
    update(newQuery) {
        if (this.query !== newQuery) {
            this.startFrom = 1
        }

        this.query = newQuery
    }

    /**
     * next page based on the page items
     * TODO: add limitation for the next page by the total number  
     * @memberof Service
     */
    nextPage() {
        this.startFrom += this.numberPerPage
    }

    /**
     * previous page and check if it is the first one
     *
     * @memberof Service
     */
    prevPage() {
        if (this.startFrom <= 1) {
            this.startFrom = 1
        } else {
            this.startFrom -= this.numberPerPage
        }
    }

}