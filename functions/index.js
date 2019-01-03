var express = require("express");

var indexRouter = require("./routes/index");
const functions = require("firebase-functions");

var app = express();
// Create "main" function to host all other top-level functions
var main = express();
main.use("/api/", app);

// Expose Express API as a single Cloud Function:
exports.api = functions.https.onRequest(main);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/news", indexRouter);
