var express = require('express')
const bodyParser = require('body-parser')

var regisRouter = require('./routes/register')
var indexRouter = require('./routes/index')
const functions = require('firebase-functions')

var app = express()
// Create "main" function to host all other top-level functions
var main = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

main.use('/api/', app)

// Expose Express API as a single Cloud Function:
exports.api = functions.https.onRequest(main)

app.use('/news', indexRouter)
app.use('/regis',regisRouter)
