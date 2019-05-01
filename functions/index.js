var express = require('express')
const bodyParser = require('body-parser')

var regisRouter = require('./routes/register')
var indexRouter = require('./routes/index')
var userRouter = require('./routes/user')
const functions = require('firebase-functions')
//const fileUpload=require('./config/admin')
var app = express()
// Create "main" function to host all other top-level functions
var main = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
//fileUpload("/picture",app)
main.use('/api/', app)

// Expose Express API as a single Cloud Function:
exports.api = functions.https.onRequest(main)

app.use('/user',userRouter)
app.use('/news', indexRouter)
app.use('/regis',regisRouter)
