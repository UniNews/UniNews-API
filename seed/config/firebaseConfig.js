var admin = require('firebase-admin')
var serviceAccount = require('./serviceAccountKey.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://uninews-api.firebaseio.com'
})
var firestore = admin.firestore()
firestore.settings({ timestampsInSnapshots: true })

module.exports = {
  admin
}
