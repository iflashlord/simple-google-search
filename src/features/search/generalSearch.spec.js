import { waitFor } from "@testing-library/dom"
import "@testing-library/jest-dom/extend-expect"
import { JSDOM } from "jsdom"

import GeneralSearch from "./generalSearch"

var generalSearchTest
var sampleElement
describe("generalSearch.js", () => {
    beforeEach(() => {
        sampleElement = document.createElement("div")
        document.body.appendChild(sampleElement)
        sampleElement.appendChild(document.createElement("ul"))

        generalSearchTest = new GeneralSearch(null, sampleElement)

    })

    it("check render for no result page if dataResult is undefined or null", () => {
        generalSearchTest.render(null)

        // check generated no result li exist and has no-result class
        expect(sampleElement.querySelector("li").className).toEqual("no-result")
    })

    it("check render for sample result", () => {
        // set fake template function
        generalSearchTest.renderTemplate = (data) => (`<i>${data.name}</i>`)

        const sampleJSON = { items: [{ name: "Tom" }, { name: "Judy" }] }

        generalSearchTest.render(sampleJSON)

        // check the first item exist and has the proper value
        expect(sampleElement.querySelectorAll("i")[0].innerHTML).toEqual("Tom")

        // check the second item exist and has the proper value
        expect(sampleElement.querySelectorAll("i")[1].innerHTML).toEqual("Judy")
    })

    it("check clearElementNode to clear anything inside element", () => {
        sampleElement.innerHTML = "something to clear"

        // check if it has smaple data
        expect(sampleElement.innerHTML).toEqual("something to clear")

        // run clearElementNode to clear node
        generalSearchTest.clear(sampleElement)

        // check if it is clear
        expect(sampleElement.innerHTML).toEqual("")

    })


})