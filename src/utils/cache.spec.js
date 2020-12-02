import Cache from './cache'

var cacheTest
describe('cache.js', () => {
    beforeEach(() => {
        cacheTest = new Cache()
    })

    it('check cache is null at first', () => {
        // check storage object to be clear at first
        expect(Object.entries(cacheTest.storage).length).toEqual(0)
    })

    it('check cache works well', () => {
        // check store data 
        cacheTest.store('sample', { data: true })

        // check the length of storage if it has a value after store data in it
        expect(Object.entries(cacheTest.storage).length).toEqual(1)

        // check data stored by sample key if it has correct value
        expect(cacheTest.storage['sample'].data).toEqual(true)

        // check retrieve method to retrieve the stored value by key
        expect(cacheTest.retrieve('sample')).not.toEqual(false)

        // check retrieve method with unknown key to return null
        expect(cacheTest.retrieve('unknown')).toEqual(null)

    })

    it('check clear cache', () => {
        cacheTest.store('sample', { data: true })

        // check if the storage has some data
        expect(Object.entries(cacheTest.storage).length).toEqual(1)

        // clear method
        cacheTest.clear()

        // check if the storage cleared
        expect(Object.entries(cacheTest.storage).length).toEqual(0)

    })

})