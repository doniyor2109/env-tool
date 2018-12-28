var EnvManager = {
  checker: function (env) {
    return process.env.NODE_ENV === env;
  },
  envChecker: function (env, callback) {
    return function () {
      if (EnvManager.checker(env)) {
        callback.apply(null, Array.prototype.slice.call(arguments, 0))
      }
    }
  },
  envNotChecker: function (env, callback) {
    return function () {
      if (!EnvManager.checker(env)) {
        callback.apply(null, Array.prototype.slice.call(arguments, 0))
      }
    }
  },
  setChecker: function (checker) {
    EnvManager.checker = checker
  },
}

function createDefaultEnvs() {
  var envs = {
    dev: 'development',
    prod: 'production',
  };

  return Object.keys(envs).reduce(function (acc, key) {
    var env = envs[key];
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

    return Object.assign(acc, {
      [ key ]: envTools,
      not: {
        [ key ]: not,
      },
    });
  }, {});
}

var envTools = Object.assign(
  EnvManager,
  createDefaultEnvs(),
);

module.exports = envTools;
module.exports.defaults = envTools;
