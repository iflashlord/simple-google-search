import Cache from "./../../utils/cache"

/**
 * general search class as the main class for both web and image
 * the main goal is to search and render the result to the selected element
 *
 * @export
 * @class GeneralSearch
 */
export default class GeneralSearch {

    constructor(service, element) {
        this.service = service
        this.element = element

        this.loadingElement = element.getElementsByClassName("loading")[0]
        this.dataElement = element.querySelector("ul")

        this.cache = new Cache()

        // add an event to result section to handel all items in it
        this.element.addEventListener("click", this.clickHandler.bind(this))
    }

    /**
     * request and get result
     *
     * @param {string} query word to search on google
     * @memberof GeneralSearch
     */
    search(query) {
        if (!query || query.trim().length == 0) {
            this.render(null)
            return;
        }

        this.service.update(query)

        // last request url to check with new request
        const lastRequestURL = this.service.requestUrl;

        // generate url before request it needs to reduce 
        this.service.generateUrl()

        if (lastRequestURL === this.service.requestUrl) {
            return;
        }

        // check any cached version exist 
        const cachedResult = this.cache.retrieve(this.service.requestUrl)
        if (cachedResult) {
            this.render(cachedResult, this.element)
            this.loading(false)
            return
        }

        this.loading(true)

        // perform a request
        this.service.request().then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    this.errorHandler(response)
                }
            }).then(response => {

                // manage store data on temporary cache storage
                const managedResult = this.cache.store(this.service.requestUrl, response)

                // run render create html element on DOM
                this.render(managedResult, this.element)
                this.loading(false)
            })
            .catch(err => {
                this.errorHandler(err)
                this.loading(false)
            })
    }

    /**
     * generate html by iterate the result
     *
     * @param {object} result object of result that it has items in it
     * @memberof GeneralSearch
     */
    render(result) {
        // TODO: check searchInformation->totalResults
        if (!result || !result.items) {
            this.clear(this.dataElement)
            const noResult = `<li class="no-result"></li>`
            this.dataElement.insertAdjacentHTML("beforeend", noResult)
            return
        }

        this.clear(this.dataElement)

        result.items.forEach((data) => {
            const itemTemplate = this.renderTemplate(data)
            this.dataElement.insertAdjacentHTML("beforeend", itemTemplate)
        })
    }

    /**
     * clear node with set the empty value to innerHTML
     *
     * @param {node} element
     * @memberof GeneralSearch
     */
    clear(element) {
        element.innerHTML = ""
    }

    /**
     * template manager to change result type base place data
     * data result object to use in template
     * 
     * @param {object} data object of result data in order to use in template
     * @returns string
     * @memberof GeneralSearch
     */
    renderTemplate(data) {
        return "Empty Template"
    }

    /**
     * handel show/hide loading element in section
     *
     * @param {boolean} active show or hide loading
     * @memberof GeneralSearch
     */
    loading(active) {
        this.loadingElement.style.display = active ? "block" : "none"
    }

    /**
     * event on the parent of elements
     *
     * @param {mouse} event mouse event
     * @memberof GeneralSearch
     */
    clickHandler(event) {
        // get the item with action
        const targetAction = event.target

        // if it is a button
        if (targetAction.nodeName === "BUTTON") {
            this.buttonAction(targetAction.attributes.route.value)
        }
    }

    /**
     * data specific to an item to do action
     *
     * @param {string} data string data comes from the route attribute on buttons
     * @memberof GeneralSearch
     */
    buttonAction(data) {
        // then use the route value to action
        console.log(data)
    }

    /**
     * run service next page action
     *
     * @memberof GeneralSearch
     */
    nextPage() {
        this.service.nextPage()
    }

    /**
     * run service previous page action
     *
     * @memberof GeneralSearch
     */
    prevPage() {
        if (this.service.startFrom !== 1) {
            this.service.prevPage()
        }
    }

    /**
     * handle errors for both message and status
     *
     * @param {error} error error related to http request
     * @memberof GeneralSearch
     */
    errorHandler(error) {
        console.log("ERROR: ", error)

        if (error.ok === false) {
            switch (error.status) {
                case 429:
                    alert("Cros Domain Error!")
                    break
                case 400:
                    alert("Validation Error!")
                    break
                case 500:
                    alert("Server error, try again!")
                    break
                default:
                    alert("Something went wrong!")
                    break
            }
        }

        if (error.error && error.error.message) {
            alert(error.error.message)
        }
    }

}