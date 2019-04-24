const firebase = require('firebase')
require("firebase/auth");
require("firebase/database");
const admin = require('firebase-admin')
const functions = require('firebase-functions')
const cors = require('cors')({
  origin: true
})

var config = {
  apiKey: "AIzaSyD809aZn1CwnJPNwvTh-p4SHSNysesnS0U",
  authDomain: "uninews-api.firebaseapp.com",
  databaseURL: "https://uninews-api.firebaseio.com",
  projectId: "uninews-api",
  storageBucket: "uninews-api.appspot.com",
  messagingSenderId: "879298084174"
};
firebase.initializeApp(config);
var firebaseDB = firebase.database()
var firebaseAuth=firebase.auth()
admin.initializeApp(functions.config().firebase)
module.exports = {
  firebaseDB,
  admin,
  cors,
  firebase,
  firebaseAuth
}
