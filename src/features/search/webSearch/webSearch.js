import GeneralSearch from '../generalSearch'

/**
 * class inherited from general search class for web search
 *
 * @export
 * @class WebSearch
 * @extends {GeneralSearch}
 */
export default class WebSearch extends GeneralSearch {

    /**
     * override template web search result
     *
     * @param {object} data object of result data in order to use in template
     * @returns string
     * @memberof WebSearch
     */
    dataTemplate(data) {
        const title = data.title
        const displayLink = data.displayLink
        const link = data.link
        const snippet = data.snippet

        return `<li>
                    <button route="${link}">
                        <h4>${title}</h4>
                        <div class="link">${link}</div>
                        <p>${snippet}</p>
                    </button>
                </li>`
    }

    /**
     * override data specific to an item to do action
     * data is the 'route' attribute on the templates
     * 
     * @param {string} data string data comes from the route attribute on buttons
     * @memberof WebSearch
     */
    buttonAction(data) {
        // then use the route value to action
        console.log('Action from Web Search', data)

        // TODO: open proper dialog to show result
        window.open(data)
    }

}