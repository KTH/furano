/**
 * All process.env:s that if not set already will be used.
 * Example:
 * if (!PORTILLO_CLUSTER) {
 *   process.env.PORTILLO_CLUSTER = "active"
 * }
 *)
 */
const DEFAULTS = {
  PORT: 3000,
  APPINSIGHTS_INSTRUMENTATIONKEY: "",
};

/**
 * Set all of the DEFAULTS env:s that does not already have a value.
 *
 * @param {*} log Pass true to get information logged for missing envs that get a default value.
 */
const set = (log = false) => {
  Object.keys(DEFAULTS).forEach(function (key) {
    if (!process.env[key]) {
      if (log) {
        logUsingDefault(key, DEFAULTS[key]);
      }
      process.env[key] = DEFAULTS[key];
    }
  });
};

/**
 * Remove all process.envs that are found in DEFAULTS.
 */
const unset = () => {
  Object.keys(DEFAULTS).forEach(function (key) {
    delete process.env[key];
  });
};

/**

 * @param {*} env 
 * @param {*} defaultValue 
 */
const logUsingDefault = (env, defaultValue) => {
  console.log(` - '${env}' is not set, defaulting to '${defaultValue}'.`);
};

/**
 * Module exports
 */
module.exports = {
  set: set,
  unset: unset,
  DEFAULTS: DEFAULTS,
};
