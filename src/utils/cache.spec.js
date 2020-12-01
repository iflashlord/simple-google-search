import Cache from './cache'

var cacheClassSample
describe('cache.js', () => {
    beforeEach(() => {
        cacheClassSample = new Cache()
    })

    it('check cache is null at first', () => {
        // check cache object is clear
        expect(Object.entries(cacheClassSample.cacheStorage).length).toEqual(0)
    })

    it('check manage cache works well', () => {
        // check manage with sample object
        cacheClassSample.manageCache('sample', { data: true })

        // check the length 
        expect(Object.entries(cacheClassSample.cacheStorage).length).toEqual(1)

        // check data based on the key
        expect(cacheClassSample.cacheStorage['sample'].data).toEqual(true)

        // check checkCache method to check it is exist
        expect(cacheClassSample.checkCache('sample')).not.toEqual(false)

    })

    it('check clear cache', () => {
        cacheClassSample.manageCache('sample', { data: true })
        expect(Object.entries(cacheClassSample.cacheStorage).length).toEqual(1)

        // check clear works properly
        cacheClassSample.clear()

        expect(Object.entries(cacheClassSample.cacheStorage).length).toEqual(0)
        expect(cacheClassSample.checkCache('sample')).toEqual(false)

    })

})