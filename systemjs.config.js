const SystemJS = require('systemjs');


SystemJS.import({
  "paths": {
    "@manydesigns/portofino/": "dist/"
  },
  "map": {
    "axios": "node_modules\\axios",
    "date-fns": "node_modules\\date-fns\\esm",
    "qs": "node_modules\\qs\\lib",
    "follow-redirects": "node_modules\\follow-redirects",
    "side-channel": "node_modules\\side-channel",
    "call-bind": "node_modules\\call-bind",
    "get-intrinsic": "node_modules\\get-intrinsic",
    "object-inspect": "node_modules\\object-inspect",
    "function-bind": "node_modules\\function-bind",
    "has": "node_modules\\has",
    "has-symbols": "node_modules\\has-symbols"
  },
  "packages": {
    "@manydesigns/portofino": {
      "main": "portofino.es.js",
      "format": "esm"
    },
    "node_modules\\axios": {
      "main": "index.js"
    },
    "node_modules\\date-fns\\esm": {
      "main": "index.js",
      "format": "esm"
    },
    "node_modules\\qs\\lib": {
      "main": "index.js"
    },
    "node_modules\\follow-redirects": {
      "main": "index.js"
    },
    "node_modules\\side-channel": {
      "main": "index.js"
    },
    "node_modules\\call-bind": {
      "main": "index.js"
    },
    "node_modules\\get-intrinsic": {
      "main": "index.js"
    },
    "node_modules\\object-inspect": {
      "main": "index.js"
    },
    "node_modules\\function-bind": {
      "main": "index"
    },
    "node_modules\\has": {
      "main": "src"
    },
    "node_modules\\has-symbols": {
      "main": "index.js"
    }
  }
});