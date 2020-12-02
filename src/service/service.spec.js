import Service from "./service"

var serviceTest
describe("service.js", () => {

    it("check url request for web", () => {
        serviceTest = new Service("web", 9, 1)
        serviceTest.requestUrl();

        expect(serviceTest.requestUrl.indexOf("searchType=0")).not.toEqual(-1)
        expect(serviceTest.requestUrl.indexOf("imgSize=medium")).toEqual(-1)
        expect(serviceTest.requestUrl.indexOf("searchType=image")).toEqual(-1)
    })

    it("check url request for image", () => {
        serviceTest = new Service("image", 9, 1)
        serviceTest.requestUrl();

        expect(serviceTest.url.indexOf("imgSize=medium")).not.toEqual(-1)
        expect(serviceTest.url.indexOf("searchType=image")).not.toEqual(-1)
    })


    it("check url request for start and num", () => {
        serviceTest = new Service("web", 10, 99)
        serviceTest.requestUrl();

        expect(serviceTest.url.indexOf("start=99")).not.toEqual(-1)
        expect(serviceTest.url.indexOf("num=10")).not.toEqual(-1)

    })

    it("check update method to change query", () => {
        serviceTest = new Service("web", 10, 99)

        serviceTest.update("updated string")

        expect(serviceTest.query).toEqual("updated string")

        serviceTest.update("updated new string")

        expect(serviceTest.query).toEqual("updated new string")

    })
    it("check nextPage method to change startFrom", () => {
        serviceTest = new Service("web", 5, 1)

        expect(serviceTest.startFrom).toEqual(1)

        // one next page check current page + item per page
        serviceTest.nextPage()

        // 5 + 1
        expect(serviceTest.startFrom).toEqual(6)

        // two next page check
        serviceTest.nextPage()
        serviceTest.nextPage()

        // 6 + 5 + 5
        expect(serviceTest.startFrom).toEqual(16)

    })

    it("check prevPage method to change startFrom", () => {
        serviceTest = new Service("web", 5, 16)

        // check the initial value
        expect(serviceTest.startFrom).toEqual(16)

        // one previous page check
        serviceTest.prevPage()

        // 16 - 5
        expect(serviceTest.startFrom).toEqual(11)

        // two previous page check
        serviceTest.prevPage()
        serviceTest.prevPage()

        // 11 - 5 - 5
        expect(serviceTest.startFrom).toEqual(1)

    })


})