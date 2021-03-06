const fs = require('fs')
const Ajv = require('ajv')
var ajv = new Ajv();

function getSchema(request, response) {
    filePath = getFilePathFromRequest(request)

    if (!fileExists(filePath)) {
        response.status(404);
        response.json({ "error": "schema not found" })
        return response
    }

    fs.readFile(filePath, (err, data) => {
        if (err) {
            response.status(500);
            response.json({ "error": "could not read schema file" })
            return response
        }
        let schema = JSON.parse(data);
        response.json(schema);
        return response
    })
}

function validateJson(request, response) {
    filePath = getFilePathFromRequest(request)

    if (!fileExists(filePath)) {
        response.status(404);
        response.json({ "error": "schema not found" })
        return response
    }

    fs.readFile(filePath, (err, data) => {
        if (err) {
            response.status(500);
            response.json({ "error": "could not read schema file" })
            return response
        }
        let schema = JSON.parse(data);
        var validate = ajv.compile(schema);
        let valid = validate(request.body);
        if (valid) {
            response.status(200);
            response.json({})
        } else {
            response.status(400);
            response.json({ "errors": validate.errors })
        }
        return response
    })
}

function fileExists(path) {
    return fs.existsSync(filePath)
}

function getFilePathFromRequest(request) {
    application = request.params.application;
    schema = request.params.schema;
    return `schemas/${application}/${schema}.json`
}

module.exports.getSchema = getSchema
module.exports.validateJson = validateJson