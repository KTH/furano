const express = require("express");
const bodyParser = require("body-parser");
const { templates } = require("@kth/basic-html-templates");
const defaultEnvs = require("@kth/default-envs");
const httpResponse = require("@kth/http-responses");
const { log } = require("./modules/logger");
const app = express();
const validation = require("./validation");
const about = require("./config/version");
const started = new Date();

/**
 * Let kth/* packages use the Furano log.
 */
httpResponse.setLogger(log);

/**
 * Process env:s that are not configured on start up, but accessed
 * as envs in the application are added with there default values.
 *
 * They are also logged.
 *
 * This way you will always have a value for process.env.X
 */
defaultEnvs.set(
  {
    PORT: 3000,
    APPINSIGHTS_INSTRUMENTATIONKEY: "",
  },
  log
);

// Force to accept only json requests
app.use(
  bodyParser.json({
    type: function () {
      return true;
    },
  })
);

app.post("/:application/:schema", (request, response) => {
  response = validation.validateJson(request, response);
});

app.get("/:application/:schema", (request, response) => {
  response = validation.getSchema(request, response);
});

/**
 * About route.
 */
app.get("/_about", function (request, response) {
  httpResponse.ok(request, response, templates._about(about, started));
});

/**
 * Health check route.
 */
app.get("/_monitor", function (request, response) {
  httpResponse.ok(
    request,
    response,
    templates._monitor((status = "OK")),
    httpResponse.contentTypes.PLAIN_TEXT
  );
});

/**
 * Health check route.
 */
app.get("/", function (request, response) {
  httpResponse.ok(
    request,
    response,
    templates.index(
      (title = "Furano - JSON Schema Validation Service"),
      (body =
        "<p>Read <a href='https://gita.sys.kth.se/infosys/furano'>how to validate your JSON objects</a> here.</p>")
    )
  );
});

/**
 * Default route, if no other route is matched.
 */
app.use(function (request, response) {
  httpResponse.notFound(request, response, templates.error404());
});

app.listen(process.env.PORT, (err) => {
  if (err) {
    return log.info("something bad happened", err);
  }

  log.info(`Furano is listening on ${process.env.PORT}`);
});
