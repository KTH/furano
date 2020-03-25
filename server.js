const express = require("express");
const bodyParser = require("body-parser");
const validation = require("./validation");
const templates = require("./modules/templates");
const app = express();
const port = 3000;

// Force to accept only json requests
app.use(
  bodyParser.json({
    type: function() {
      return true;
    }
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
app.get("/_about", function(req, res) {
  res.status(200).send(templates._about());
});

/**
 * Health check route.
 */
app.get("/_monitor", function(req, res) {
  res.set("Content-Type", "text/plain");
  res.status(200).send(templates._monitor());
});

/**
 * Health check route.
 */
app.get("/", function(req, res) {
  res.status(200).send(templates.index());
});

/**
 * Default route, if no other route is matched.
 */
app.use(function(req, res) {
  res.status(404).send(templates.error404());
});

app.listen(port, err => {
  if (err) {
    return console.log("something bad happened", err);
  }

  console.log(`Furano is listening on ${port}`);
});
