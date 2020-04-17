const express = require("express");
const bodyParser = require("body-parser");
const { templates } = require("@kth/basic-html-templates");
const httpResponse = require("@kth/http-responses");
const app = express();
const validation = require("./validation");
const defaultEnvs = require("./modules/defaultEnvs");
const about = require("./config/version");

defaultEnvs.set(true);

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
  httpResponse.ok(request, response, templates._about(about));
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
    templates.index("Furano - JSON Schema Validation Service")
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
    return console.log("something bad happened", err);
  }

  console.log(`Furano is listening on ${process.env.PORT}`);
});
