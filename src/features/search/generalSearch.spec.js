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

    it("check render method for undefined or null", () => {
        generalSearchTest.render(null)

        // check rendered no result li element exists and has no-result class
        expect(sampleElement.querySelector("li").className).toEqual("no-result")
    })

    it("check render method works well", () => {
        // set mock template function
        generalSearchTest.renderTemplate = (data) => (`<i>${data.name}</i>`)

        const sampleJSON = { items: [{ name: "Tom" }, { name: "Judy" }] }

        generalSearchTest.render(sampleJSON)

        // check the first and second items has the value of sampleJSON
        expect(sampleElement.querySelectorAll("i")[0].innerHTML).toEqual("Tom")
        expect(sampleElement.querySelectorAll("i")[1].innerHTML).toEqual("Judy")
    })

    it("check clear method", () => {
        sampleElement.innerHTML = "something to clear"

        expect(sampleElement.innerHTML).toEqual("something to clear")

        generalSearchTest.clear(sampleElement)

        expect(sampleElement.innerHTML).toEqual("")

    })


})