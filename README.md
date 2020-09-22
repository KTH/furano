# Furano - JSON schema validation service
**Provides and API for fetching json schema compliant objects read from a static file or to perform validation of a posted json object against these schemas.**

## How to validate a json object against a published schema

```python
# Example in Python
deploymentJsonToValidate = {
  "name": "profiles-web",
  "...": "more values"
}

# The service here is proxied under /jsonschema/ if you run it locally remove the /jsonschema path.
result = requests.post("https://app.kth.se/jsonschema/dizin/deployment", json=deploymentJsonToValidate, allow_redirects=False)
self.assertEqual(result.json(), {})
self.assertEqual(result.status_code, 200)
```
### Response from validation 
`https://app.kth.se/jsonschema/[schema name without .json]` `POST` - Validates the posted json body against schema given by the url. Returns `200 OK {}` on successful validation and `400 Bad Request {"error": "[validation errors]"}` on failed validation.

### Get a schema to validate agains
`https://app.kth.se/jsonschema/[application name]/[schema name without .json]` `GET` - Returns the schema as a json object

On a request for a schema that doesn't exist, the server will return `404 Page not found`

## 🚀 Add your own schema to validate your application!

1. Clone the repository
2. Add a directory under `/schemas` with your application name
3. In the created directory, add a schema with a descriptive name and the file suffix `.json`
4. Commit, push and deploy the new version of the application

## Example of usage

An example of a created schema file path could be `[project root]/schemas/kopps/user.json`

To get the schema as a json response: `curl -XGET host:port/kopps/user`

To validate a json object against the schema: `curl -XPOST -d "{..json object..}" host:port/kopps/user`
