const functions = require('firebase-functions')
const admin = require('firebase-admin')
const {auth} = require('firebase-admin')
admin.initializeApp(functions.config().firebase)
var firestore = admin.firestore()
const authService = auth();
firestore.settings({ timestampsInSnapshots: true })

module.exports = {
  firestore,authService
}
