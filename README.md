# env-tool

Helps working with environments easily

[![](https://img.shields.io/npm/v/env-tool.svg)](https://www.npmjs.com/package/env-tool)
[![Build Status](https://travis-ci.com/doniyor2109/env-tools.svg?branch=master)](https://travis-ci.com/doniyor2109/env-tools)


## Installation

```bash
npm install env-tool

or

yarn add env-tool
```

## Usages

- Run function in dev mode
    
    ```js
    const env = require("env-tool");
    
    env.dev(function () {
      // runs in develpment
    });
    
    ```

- Checks weather environment is production
    
    ```js
    const env = require("env-tool");
    
    if (env.is.prod) {
      // true for production
    }
    ```

- Log in development
    
    ```js
    const env = require("env-tool");
    
    env.dev.warn("WARNING for development");
    ```

- Run in not production

    ```js
    env.not.prod(function () {
      // run on environment that is not production
    });
    ```


## Configure

By default `env-tool` checks environment for node using `process.env.NODE_ENV`. However you can customize it yourself.

```js
const env = require("env-tool");

env.setChecker(function (env) {
  return process.env.ENV === env;
});
```

## License

MIT