import Service from './service'

var serviceClassSample
describe('service.js', () => {

    it('check generateURL set type web', () => {
        serviceClassSample = new Service('web', 9, 1)
        serviceClassSample.generateURL();

        // check URL type is web
        expect(serviceClassSample.requestUrl.indexOf("searchType=0")).not.toEqual(-1)
        expect(serviceClassSample.requestUrl.indexOf("imgSize=medium")).toEqual(-1)
        expect(serviceClassSample.requestUrl.indexOf("searchType=image")).toEqual(-1)
    })

    it('check generateURL set type image', () => {
        serviceClassSample = new Service('image', 9, 1)
        serviceClassSample.generateURL();

        // check URL type is image in query string
        expect(serviceClassSample.requestUrl.indexOf("imgSize=medium")).not.toEqual(-1)
        expect(serviceClassSample.requestUrl.indexOf("searchType=image")).not.toEqual(-1)
    })


    it('check generateURL set start and num', () => {
        serviceClassSample = new Service('web', 10, 99)
        serviceClassSample.generateURL();

        // check both start and num in query string
        expect(serviceClassSample.requestUrl.indexOf("start=99")).not.toEqual(-1)
        expect(serviceClassSample.requestUrl.indexOf("num=10")).not.toEqual(-1)

    })

    it('check updateQuery for change querySearch', () => {
        serviceClassSample = new Service('web', 10, 99)

        // check update the search query
        serviceClassSample.updateQuery('updated string')

        expect(serviceClassSample.querySearch).toEqual('updated string')

        // check update the search query
        serviceClassSample.updateQuery('updated new string')

        expect(serviceClassSample.querySearch).toEqual('updated new string')

    })
    it('check nextPage for change startFrom', () => {
        serviceClassSample = new Service('web', 5, 1)

        // check the initial value
        expect(serviceClassSample.startFrom).toEqual(1)

        // one next page check current page + item per page
        serviceClassSample.nextPage()

        // 5 + 1
        expect(serviceClassSample.startFrom).toEqual(6)

        // two next page check
        serviceClassSample.nextPage()
        serviceClassSample.nextPage()

        // 6 + 5 + 5
        expect(serviceClassSample.startFrom).toEqual(16)

    })

    it('check prevPage for change startFrom', () => {
        serviceClassSample = new Service('web', 5, 16)

        // check the initial value
        expect(serviceClassSample.startFrom).toEqual(16)

        // one previous page check
        serviceClassSample.prevPage()

        // 16 - 5
        expect(serviceClassSample.startFrom).toEqual(11)

        // two previous page check
        serviceClassSample.prevPage()
        serviceClassSample.prevPage()

        // 11 - 5 - 5
        expect(serviceClassSample.startFrom).toEqual(1)

    })


})