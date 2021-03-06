//require("babel-polyfill");

require("babel-register")({
  only: /src/,
});

/**
 * Define isomorphic constants.
 */
global.__CLIENT__ = false;
global.__SERVER__ = true;

if (process.env.NODE_ENV !== "production") {
  if (!require("piping")({hook: true, includeModules: false})) {
    return;
  }
}

try {
  require("./src/server");
}
catch (error) {
  console.error(error.stack);
}