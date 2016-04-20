###Document Management API

[![Build Status](https://travis-ci.org/andela-ekupara/DcManFrontEnd.svg?branch=feature/fend-tests)](https://travis-ci.org/andela-ekupara/DcManFrontEnd)
[![codecov.io](https://codecov.io/github/andela-ekupara/DcManFrontEnd/coverage.svg?branch=feature/fend-tests)](https://codecov.io/github/andela-ekupara/DcManFrontEnd?branch=master)
[![Coverage Status](https://coveralls.io/repos/github/andela-ekupara/DcManFrontEnd/badge.svg?branch=master)](https://coveralls.io/github/andela-ekupara/DcManFrontEnd?branch=master)


This is a simple application to help a user with a predefined role create and manage documents. Users create documents and speciy the roles that are allowed to access the document by setting an access level. 

Admins can access all documents.
Normal users can access their documents as well as all public documents.
Viewers will only see public documents and can not create documents.


## Testing
Testing is done using [**Supertest**](https://www.npmjs.com/package/supertest) and [**Jasmine**](https://www.npmjs.com/package/jasmine). Supertest enables sending requests to the various API endpoints. 
To test the system, git clone the repo, install node and mongodb, run ``npm instal``, then navigate to the root folder of the project and make sure you are in the master branch. Run ``npm test`` to run both front and back-end tests. Front end tests are run with karma and mocha whereas back-end tests are run with jasmine.

The application is hosted online on [**Heroku**](http://dcman.herokuapp.com)
