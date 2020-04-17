const test = require("tape");
const rewire = require("rewire");
var validation = require("./validation");

test("test getFilePathFromRequest", function (t) {
  t.plan(2);
  var getFilePathFromRequest = rewire("./validation").__get__(
    "getFilePathFromRequest"
  );
  t.equal(typeof getFilePathFromRequest, "function");
  request = { params: { application: "kopps", schema: "user" } };
  result = getFilePathFromRequest(request);
  t.equal(result, "schemas/kopps/user.json");
});

test("test fileExists", function (t) {
  t.plan(1);
  var fileExists = rewire("./validation").__get__("fileExists");
  filePath = "schemas/dizin/deployment.json";
  t.true(fileExists(filePath));
});
