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

        // add an event to the rendering container to handle all items in it
        this.element.addEventListener("click", this.clickHandler.bind(this))
    }

    /**
     * search by query text on google regarding the service
     * it also checks if the query is null to render an empty page
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

        // last request URL to check with a new request
        const lastRequestedURL = this.service.requestUrl;

        // generate URL before request (it needs to reduce the number of requests)
        this.service.generateUrl()

        // prevent the re-render of the current request by URL 
        if (lastRequestedURL === this.service.requestUrl) {
            return;
        }

        // check if any cached result exist to use that instead of a new request
        const cachedResult = this.cache.retrieve(this.service.requestUrl)
        if (cachedResult) {
            this.render(cachedResult, this.element)
            this.loading(false)
            return
        }

        this.loading(true)

        // use service to HTTP request the search query
        this.service.request().then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    this.errorHandler(response)
                }
            }).then(response => {

                // get response result through the store method to check cache first
                const result = this.cache.store(this.service.requestUrl, response)

                this.render(result, this.element)
                this.loading(false)
            })
            .catch(err => {
                this.errorHandler(err)
                this.loading(false)
            })
    }

    /**
     * render html by iterate the result
     * we use renderTemplate method to get template for rendering process
     *
     * @param {object} result object of result that it has items in it
     * @memberof GeneralSearch
     */
    render(result) {
        // TODO: check searchInformation->totalResults
        if (!result || !result.items) {
            this.emptyPage(result)
            return
        }

        this.clear(this.dataElement)

        result.items.forEach((data) => {
            const itemTemplate = this.renderTemplate(data)
            this.dataElement.insertAdjacentHTML("beforeend", itemTemplate)
        })
    }


    /**
     * empty page method to insert no result page
     *
     * @param {object} result
     * @memberof GeneralSearch
     */
    emptyPage(result) {
        this.clear(this.dataElement)
        const noResult = `<li class="no-result"></li>`
        this.dataElement.insertAdjacentHTML("beforeend", noResult)
    }

    /**
     * clear element with set the empty value to innerHTML
     *
     * @param {node} element
     * @memberof GeneralSearch
     */
    clear(element) {
        element.innerHTML = ""
    }

    /**
     * template to format the render result
     * 
     * @param {object} data the object of result data to use in the template
     * @returns string
     * @memberof GeneralSearch
     */
    renderTemplate(data) {
        return "Empty Template"
    }

    /**
     * handel show/hide loading element
     *
     * @param {boolean} active show or hide loading
     * @memberof GeneralSearch
     */
    loading(active) {
        this.loadingElement.style.display = active ? "block" : "none"
    }

    /**
     * buttons event handler with check node only is a button
     *
     * @param {mouse} event mouse event
     * @memberof GeneralSearch
     */
    clickHandler(event) {
        const targetAction = event.target

        if (targetAction.nodeName === "BUTTON") {
            this.buttonAction(targetAction.attributes.route.value)
        }
    }

    /**
     * button click handler with its route attribute data
     *
     * @param {string} data
     * @memberof GeneralSearch
     */
    buttonAction(data) {
        console.log(data)
    }

    /**
     * next page call through the service class
     *
     * @memberof GeneralSearch
     */
    nextPage() {
        this.service.nextPage()
    }

    /**
     * previous page call through the service class
     * check for limitation on first page
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