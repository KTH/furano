const express = require('express')
const fs = require('fs')
const Ajv = require('ajv')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

app.use(bodyParser.json());

app.post('/:application/:schema', (request, response) => {
    application = request.params.application;
    schema = request.params.schema;

    fs.readFile(`schemas/${application}/${schema}.json`, (err, data) => {
        if (err) {
            response.status(404);
            response.json({ "error": "schema not found" })
            return response
        }
        var ajv = new Ajv();
        let schema = JSON.parse(data);
        var valid = ajv.validate(schema, request.body);
        if (valid) {
            response.status(200);
            response.json({})
        } else {
            response.status(400);
            response.json({ "errors": ajv.errors })
        }
    })
})

app.get('/:application/:schema', (request, response) => {
    application = request.params.application;
    schema = request.params.schema;
    const fs = require('fs');

    fs.readFile(`schemas/${application}/${schema}.json`, (err, data) => {
        if (err) {
            response.status(404);
            response.json({ "error": "schema not found" })
            return response
        }
        let schema = JSON.parse(data);
        response.json(schema);
    })
})

app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }

    console.log(`Furano is listening on ${port}`)
})