const firebase = require('firebase')
const admin = require('firebase-admin')
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
admin.initializeApp()
module.exports = {
  firebaseDB,
  admin,
  cors,
  firebase
}
