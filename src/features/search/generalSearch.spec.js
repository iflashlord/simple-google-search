import { waitFor } from '@testing-library/dom'
import '@testing-library/jest-dom/extend-expect'
import { JSDOM } from 'jsdom'

import GeneralSearch from './generalSearch'

var generalSearchClassSample
var sampleElement
describe('generalSearch.js', () => {
    beforeEach(() => {
        // ready simple element base on the template
        sampleElement = document.createElement('div')
        document.body.appendChild(sampleElement)
        sampleElement.appendChild(document.createElement('ul'))

        // sample class
        generalSearchClassSample = new GeneralSearch(null, sampleElement)

    })


    it('check generator for no result page if dataResult is undefined or null', () => {
        generalSearchClassSample.generator(null, sampleElement)

        // check generated no result li exist and has no-result class
        expect(sampleElement.querySelector('li').className).toEqual('no-result')
    })

    it('check generator for sample result', () => {
        // set fake template function
        generalSearchClassSample.dataTemplate = (data) => (`<i>${data.name}</i>`)

        // sample json
        const sampleJSON = { items: [{ name: "Tom" }, { name: "Judy" }] }

        // generate sample JSON
        generalSearchClassSample.generator(sampleJSON, sampleElement)

        // check the first item exist and has the proper value
        expect(sampleElement.querySelectorAll('i')[0].innerHTML).toEqual('Tom')

        // check the second item exist and has the proper value
        expect(sampleElement.querySelectorAll('i')[1].innerHTML).toEqual('Judy')
    })

    it('check clearElementNode to clear anything inside element', () => {
        // set sample data to element
        sampleElement.innerHTML = "something to clear"

        // it should have the sample data
        expect(sampleElement.innerHTML).toEqual("something to clear")

        // run clearElementNode to clear node
        generalSearchClassSample.clearElementNode(sampleElement)

        // it should be clear
        expect(sampleElement.innerHTML).toEqual("")

    })


})