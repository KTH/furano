const express = require('express')
const bodyParser = require('body-parser')
const validation = require('./validation')
const app = express()
const port = 3000

// Force to accept only json requests
app.use(bodyParser.json({
    type: function() {
        return true;
    }
}));

app.post('/:application/:schema', (request, response) => {
    response = validation.validateJson(request, response)
})

app.get('/:application/:schema', (request, response) => {
    response = validation.getSchema(request, response)
})

app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }

    console.log(`Furano is listening on ${port}`)
})