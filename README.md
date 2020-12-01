# Simple Google Search


#### Available online on:
https://simple-google-search-tv-app.herokuapp.com/

#### Install Packages: 

`npm i `

#### Run Application: 
`npm run dev `

#### Run Tests: 
`npm test`

#### Build Production: 
`npm build`


#### Serve Production: 
`npm start`
**Note:** Regarding the release on the Heroku, we should change `npm start` to run serve `build` .

#### Build and Serve Code Documentation: 

`npm run doc`



#### Description

* I have used a simple class method to manage this project. I have separated the search section into two requests, one for the web result and the other for the image result.
  Using the button as the parent element is related to efficiently controlling on-page aspects with this type of item; we can set an id to objects and, based on some event, efficiently focus on the element that we want. It is beneficial for working on keyboard control on the page.
* The `src/utils/cache.js` Stores request results in temporary storage and cache based on the URL requests to reduce the number of repeated requests and speedup.
* Using the `Webpack` for both the development and build process.
* Using `Sass` for the style of the project.
* The `src/config/config.json` for API key and data related to API.
* The `src/data` folder is only for testing sample JSON results.
* The `src/assets` folder is regarding  some default color with the SVG images.
* The` src/features` folder is about the project sections, and the src/features/search folder is about the main general search class and two image and web subclasses.
* The `src/service/service.js` is a request manager class to make it easier to handle.
* The `config` folder in root is about the webpack, babel, JSDoc, etc. for run and build project.



#### Google API Info: 

**APIKey:** https://developers.google.com/custom-search/json-api/v1/overview

**CX Code:** https://cse.google.com/cse/setup/

