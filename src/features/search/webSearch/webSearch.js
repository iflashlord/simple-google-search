import GeneralSearch from "../generalSearch"

/**
 * class inherited from general search class for web search
 *
 * @export
 * @class WebSearch
 * @extends {GeneralSearch}
 */
export default class WebSearch extends GeneralSearch {

    /**
     * template to format the render result
     * 
     * @param {object} data the object of result data to use in the template
     * @returns string
     * @memberof WebSearch
     */
    renderTemplate(data) {
        const title = data.title
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
     * data is the "route" attribute on the templates
     * 
     * @param {string} data string data comes from the route attribute on buttons
     * @memberof WebSearch
     */
    buttonAction(data) {
        // TODO: open proper dialog to show result
        window.open(data)
    }

}