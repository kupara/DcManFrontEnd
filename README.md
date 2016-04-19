###Document Management API

[![Build Status](https://travis-ci.org/andela-ekupara/DcManFrontEnd.svg?branch=feature/fend-tests)](https://travis-ci.org/andela-ekupara/DcManFrontEnd)
[![codecov.io](https://codecov.io/github/andela-ekupara/DcManFrontEnd/coverage.svg?branch=feature/fend-tests)](https://codecov.io/github/andela-ekupara/DcManFrontEnd?branch=master)
[![Coverage Status](https://coveralls.io/repos/github/andela-ekupara/dcman/badge.svg?branch=master)](https://coveralls.io/github/andela-ekupara/dcman?branch=master)


This is a simple application to help a user with a predefined role create and manage documents. Users create documents and speciy the roles that are allowed to access the document by defining an access level. 

Admins can access all documents, while owners can access their documents as well as all public documents.

## Installation
  - Download and install [**Node Js**](https://nodejs.org/en/download/) and [**MongoDB**](https://www.mongodb.org/downloads#production)
  - Clone the [**repository**](https://github.com/andela-ekupara/dcman.git) or download the project zip file from the project github page [**here**](https://github.com/andela-ekupara/DcManFrontEnd). 
  - Navigate to the root of the folder and ensure you are in the master branch
  - Run npm install to install required dependencies
  - Run npm start and access the app via `localhost`
  

## Testing
Testing is done using [**Supertest**](https://www.npmjs.com/package/supertest) and [**Jasmine**](https://www.npmjs.com/package/jasmine). Supertest enables sending requests to the various API endpoints. To test the system, navigate to the root folder of the project and make sure you are in the master branch by running git branch. Front end tests are run with karma and mocha.
