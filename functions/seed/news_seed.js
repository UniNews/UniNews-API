const serviceAccount = require("./serviceAccount.json");
const databaseURL = "https://uninews-api.firebaseio.com";
// const app = firebaseHelper.firebase.initializeApp(serviceAccount, databaseURL);

const db = app.firestore;

db.settings({ timestampsInSnapshots: true });
// firebaseHelper.firestore.restore(db, "./data.json");
