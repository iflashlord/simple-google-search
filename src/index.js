import './features/main/main.scss'
import './features/header/header.scss'
import './features/search/search.scss'

/*
 * main project file
 */

// start development with local files
// import dataWebSample from './data/sample-web-result.json'
// import dataImageSample from './data/sample-image-result.json'

import Service from './service/service'
import ImageSearch from './features/search/imageSearch/imageSearch'
import WebSearch from './features/search/webSearch/webSearch'

// define the selectors
const searchForm = document.getElementById('search-form')
const searchBox = document.getElementById('search-box')
const imageResultSection = document.getElementById('image-results-section')
const webResultSection = document.getElementById('web-results-section')
const nextPageButton = document.getElementById('next-button')
const previousPageButton = document.getElementById('previous-button')


/**
 * web search feature
 * define a specific service for web search with 6 item per page and start form 1
 * define WebSearch based on the service and result element
 */
const webService = new Service("web", 6, 1)
const webSearchFeature = new WebSearch(webService, webResultSection)

/**
 * image search feature
 * define a specific service for image search with 6 item per page and start form 1
 * define ImageSearch based on the service and result element
 */
const imageService = new Service("image", 9, 1)
const imageSearchFeature = new ImageSearch(imageService, imageResultSection)


/** 
 * start with filled sample search
 */
// if (!searchBox.value) {
//     searchBox.value = "Angelina jolie"
//     imageSearchFeature.performSearch(searchBox.value)
//     webSearchFeature.performSearch(searchBox.value)
// }

/** 
 * define submit event for header form
 */
searchForm.addEventListener('submit', (e) => {
    e.preventDefault()

    imageSearchFeature.performSearch(searchBox.value)
    webSearchFeature.performSearch(searchBox.value)

    return false;
});

/** 
 * define onsubmit event for header form
 */
searchForm.addEventListener('onsubmit', (e) => {
    e.preventDefault()

    imageSearchFeature.performSearch(searchBox.value)
    webSearchFeature.performSearch(searchBox.value)

    return false;
})

/** 
 * define click event on next page button
 */
nextPageButton.addEventListener('click', (e) => {
    // image search
    imageSearchFeature.nextPage()
    imageSearchFeature.performSearch(searchBox.value)

    // Web search
    webSearchFeature.nextPage()
    webSearchFeature.performSearch(searchBox.value)
})

/** 
 * define click event on previous page button
 */
previousPageButton.addEventListener('click', (e) => {
    // image search
    imageSearchFeature.prevPage()
    imageSearchFeature.performSearch(searchBox.value)

    // Web search
    webSearchFeature.prevPage()
    webSearchFeature.performSearch(searchBox.value)
})