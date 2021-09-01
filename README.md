[![GitHub license](https://img.shields.io/github/license/Naereen/StrapDown.js.svg)](https://github.com/leojaimesson/typescript-package-boilerplate/blob/master/LICENSE.md)
[![nodejs badge](https://img.shields.io/badge/type-nodejs-green.svg)](https://nodejs.org/en/)
[![typescript badge](https://img.shields.io/badge/type-typescript-blue.svg)](https://www.typescriptlang.org/)

# HTTP response validation

Set of utility functions to help validate [Web API Response](https://developer.mozilla.org/en-US/docs/Web/API/Response) 
and provide valid response body (`response.text()` or `response.json()`) or to construct and throw `Error`

## Available scripts

+ `clean` - remove coverage data, Nyc cache and transpiled files,
+ `clean:modules` - remove and reinstall node_modules packages and package-lock.json,
+ `build` - transpile TypeScript to ES5,
+ `lint` - lint source files and tests,
+ `test` - run tests,
+ `test:watch` - interactive watch mode to automatically re-run tests
+ `test:coverage` - run tests and create code coverage reports
