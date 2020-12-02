import GeneralSearch from "../generalSearch"
/**
 * class inherited from general search class for image search
 *
 * @export
 * @class ImageSearch
 * @extends {GeneralSearch}
 */
export default class ImageSearch extends GeneralSearch {

    /**
     * override template image search result
     *
     * @param {object} data object of result data in order to use in template
     * @returns string
     * @memberof ImageSearch
     */
    renderTemplate(data) {
        const title = data.title
        const link = data.link
        const thumbnail = data.image.thumbnailLink

        return `
          <li>
              <button route="${link}">
                  <img src="${thumbnail}" alt="${title}">
              </button>
          </li>`
    }

    /**
     * override data specific to an item to do action
     * data is the "route" attribute on the templates
     * 
     * @param {string} data string data comes from the route attribute on buttons
     * @memberof ImageSearch
     */
    buttonAction(data) {
        // then use the route value to action
        console.log("Action from Image Search", data)

        // TODO: open proper dialog to show image in larger size
        window.open(data)
    }

}