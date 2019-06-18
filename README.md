# Furano
JSON schema validation service

## Description

Provides and API for fetching json schema compliant objects read from a static file or to perform validation of a posted json object against these schemas.

## API endpoints

`[url]:[port]/[application name]/[schema name without .json]` `GET` - Returns the schema as a json object

`[url]:[port]/[application name]/[schema name without .json]` `POST` - Validates the posted json body against schema given by the url. Returns `200 OK {}` on successful validation and `400 Bad Request {"error": "[validation errors]"}` on failed validation.

On a request for a schema that doesn't exist, the server will return `404 Page not found`

## How to add your own schema

1. Clone the repository
2. Add a directory under `/schemas` with your application name
3. In the created directory, add a schema with a descriptive name and the file suffix `.json`
4. Commit, push and deploy the new version of the application

## Example of usage

An example of a created schema file path could be `[project root]/schemas/kopps/user.json`

To get the schema as a json response: `curl -XGET host:port/kopps/user`

To validate a json object against the schema: `curl -XPOST -d "{..json object..}" host:port/kopps/user`
