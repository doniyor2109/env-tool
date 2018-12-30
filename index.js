function argumentsToArray(args) {
  return Array.prototype.slice.call(args, 0);
}

var assign = Object.assign;

var EnvManager = {
  checker: function (env) {
    return process.env.NODE_ENV === env;
  },
  envChecker: function (env, callback) {
    return function () {
      if (EnvManager.checker(env)) {
        callback.apply(null, argumentsToArray(arguments));
      }
    }
  },
  envNotChecker: function (env, callback) {
    return function () {
      if (!EnvManager.checker(env)) {
        callback.apply(null, argumentsToArray(arguments));
      }
    }
  },
  setChecker: function (checker) {
    EnvManager.checker = checker;
  },
}

function createDefaultEnvs() {
  var envs = {
    dev: 'development',
    prod: 'production',
    test: 'test',
  };

  return Object.keys(envs).reduce(function (acc, envName) {
    var env = envs[envName];
    var not = {};

    var methods = {
      log: console.log,
      warn: console.warn,
      error: console.warn,
    };

    function envTools(callback) {
      return EnvManager.envChecker(env, callback)(env);
    }

    Object.keys(methods).forEach(function (key) {
      envTools[key] =  EnvManager.envChecker(env, methods[key]);
      not[key] = EnvManager.envNotChecker(env, methods[key]);
    });

    var tools = Object.assign(acc, {
      [ envName ]: envTools,
      not: assign(acc.not || {}, { [ envName ]: not }),
    });

    tools.is = tools.is || {};

    Object.defineProperty(tools.is, envName, {
      get: function () {
        return EnvManager.checker(env);
      },
      enumerable: true,
      configurable: true,
    });

    return tools;
  }, {});
}

var envTools = Object.assign(
  EnvManager,
  createDefaultEnvs(),
);

module.exports = envTools;
module.exports.defaults = envTools;
