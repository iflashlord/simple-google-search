import Cache from './../../utils/cache'

/**
 * general class search
 *
 * @export
 * @class GeneralSearch
 */
export default class GeneralSearch {

    constructor(service, resultSectionElement) {
        this.service = service
        this.resultSectionElement = resultSectionElement

        // define a cache manager for requests
        this.cache = new Cache()

        // add an event to result section to handel all items in it
        this.resultSectionElement.addEventListener('click', this.clickHandler.bind(this))
    }

    /**
     * request and get result
     *
     * @param {string} querySearch word to search on google
     * @memberof GeneralSearch
     */
    performSearch(querySearch) {
        if (querySearch != undefined && querySearch.length > 0) {
            this.service.updateQuery(querySearch)
        }

        // show loading
        this.handelLoading(true)


        // generate url before request
        this.service.generateURL()

        // check any cached version exist 
        const cachedResult = this.cache.retrieve(this.service.requestUrl)
        if (cachedResult) {
            this.generator(cachedResult, this.resultSectionElement)
            this.handelLoading(false)
            return
        }

        // perform a request
        this.service.request().then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    // manage errors
                    this.errorHandler(response)
                }
            }).then(response => {

                // manage store data on temporary cache storage
                const managedResult = this.cache.store(this.service.requestUrl, response)

                // run generator to generate items
                this.generator(managedResult, this.resultSectionElement)
                this.handelLoading(false)
            })
            .catch(err => {
                // manage errors
                this.errorHandler(err)
                this.handelLoading(false)
            })
    }

    /**
     * generate html by iterate the result
     *
     * @param {object} dataResult object of result that it has items in it
     * @param {node} sectionElement element that it has ul in it for results
     * @memberof GeneralSearch
     */
    generator(dataResult, sectionElement) {
        const element = sectionElement.querySelector('ul')

        if (!dataResult || !dataResult.items) {

            // clear
            this.clearElementNode(element)

            // check searchInformation->totalResults
            const noResult = `<li class="no-result"></li>`

            element.insertAdjacentHTML('beforeend', noResult)
            return
        }

        // clear
        this.clearElementNode(element)

        dataResult.items.forEach((data) => {
            // create template
            const itemTemplate = this.dataTemplate(data)

            // insert html to the element
            element.insertAdjacentHTML('beforeend', itemTemplate)
        })
    }

    /**
     * clear node with set the empty value to innerHTML
     *
     * @param {node} element element to clear data in it
     * @memberof GeneralSearch
     */
    clearElementNode(element) {
        element.innerHTML = ''
    }

    /**
     * template manager to change result type base place data
     * data result object to use in template
     * 
     * @param {object} data object of result data in order to use in template
     * @returns string
     * @memberof GeneralSearch
     */
    dataTemplate(data) {
        return 'Empty Template'
    }

    /**
     * handel show/hide loading element in section
     *
     * @param {boolean} active show or hide loading
     * @memberof GeneralSearch
     */
    handelLoading(active) {
        this.resultSectionElement.getElementsByClassName('loading')[0].style.display = active ? 'block' : 'none'
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
        if (targetAction.nodeName === 'BUTTON') {
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
        this.service.prevPage()
    }

    /**
     * handle errors for both message and status
     *
     * @param {error} error error related to http request
     * @memberof GeneralSearch
     */
    errorHandler(error) {
        console.log('ERROR: ', error)

        if (error.ok === false) {
            switch (error.status) {
                case 429:
                    alert('Cros Domain Error!')
                    break
                case 400:
                    alert('Validation Error!')
                    break
                case 500:
                    alert('Server error, try again!')
                    break
                default:
                    alert('Something went wrong!')
                    break
            }
        }

        if (error.error && error.error.message) {
            alert(error.error.message)
        }
    }

}