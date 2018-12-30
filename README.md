# env-tools

[![Build Status](https://travis-ci.com/doniyor2109/env-tools.svg?branch=master)](https://travis-ci.com/doniyor2109/env-tools)
[![Greenkeeper badge](https://badges.greenkeeper.io/doniyor2109/env-tools.svg)](https://greenkeeper.io/)

# Table of contents

- [Introduction](#introduction)
- [Usage](#usage)
- [API Reference](#api-reference)

# Introduction

# Usage

```js
const env = require("env-tools");

env.dev.warn("WARNING for development");

if (env.is.prod) {
  // true for production
}

env.dev(function () {
  // run in develpment
})


```

# API Reference

### enviroment
 - is
    
### is
