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
        this.requestUrl = ""

        this.baseURL = Config.baseURL || ""
        this.googleAPIKey = Config.googleAPIKey || ""
        this.googleCX = Config.googleCX || ""
    }

    /**
     * generate url based on the API key
     *
     * @memberof Service
     */
    generateUrl() {
        let requestUrl = `${this.baseURL}?key=${this.googleAPIKey}&cx=${this.googleCX}&q=${encodeURIComponent(this.query)}&start=${this.startFrom}&num=${this.numberPerPage}&searchType=${this.searchFor}`

        if (this.searchFor === "image") {
            requestUrl += `&imgSize=${this.imgSize}`
        }

        this.requestUrl = requestUrl
    }

    /**
     * generate url and request fetch
     *
     * @returns promise
     * @memberof Service
     */
    request() {
        // make url ready
        this.generateUrl()

        return fetch(this.requestUrl)
    }

    /**
     * update query with new one
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
     * TODO: add limitation for next page based on the result total item, currently we only show the empty page
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