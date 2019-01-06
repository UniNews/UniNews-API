const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);
var firestore = admin.firestore();
firestore.settings({ timestampsInSnapshots: true });

module.exports = {
  firestore
};
