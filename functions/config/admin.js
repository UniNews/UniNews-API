const functions = require("firebase-functions");
const firebaseHelper = require("firebase-functions-helper");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);
var firestore = admin.firestore();
firestore.settings({ timestampsInSnapshots: true });

module.exports = {
  firebaseHelper,
  firestore
};
