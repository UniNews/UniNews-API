
const firebaseHelper = require('firebase-functions-helper');
const serviceAccount = require('./serviceAccount.json');
//const seed = require('firestore-seed');
const databaseURL= "https://uninews-api.firebaseio.com"
const app = firebaseHelper.firebase.initializeApp(serviceAccount, databaseURL);

const db = app.firestore;

db.settings({ timestampsInSnapshots: true });
firebaseHelper.firestore.restore(db, './data.json');

// // Initialize firebase-admin
// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccountKey),
//     databaseURL: "https://uninews-api.firebaseio.com",
//     storageBucket: "gs://uninews-api.appspot.com/",
// });

// Start exporting your collection
// Import seeds.
// seed.importCollections(admin,
//     [
//         seed.collection("news", [
//             seed.doc("new1", { id: '1', 
//             title: 'Best OOP2 Tutor Ever.', 
//             description: 'Come and join to our darkside in 1/1/2019.', 
//             imgs: [ 'https://scontent.fbkk2-7.fna.fbcdn.net/v/t1.0-9/26166557_1859158550821212_174884729598333408_n.jpg?_nc_cat=101&_nc_ht=scontent.fbkk2-7.fna&oh=cd336056fb622fa85c44ea4c6721956b&oe=5CD4EEC5', 'https://scontent.fbkk2-7.fna.fbcdn.net/v/t1.0-9/16684191_1431759500227788_4523539130141331084_n.jpg?_nc_cat=111&_nc_ht=scontent.fbkk2-7.fna&oh=04db3afdfca34b488dfcefc391b979b6&oe=5C979D37', 'https://scontent.fbkk2-7.fna.fbcdn.net/v/t1.0-9/10361466_836847873052290_2173673032082702579_n.jpg?_nc_cat=111&_nc_ht=scontent.fbkk2-7.fna&oh=1fe32c1f658a73cfd60cf651fff5f1e4&oe=5C9CE9AA', 'https://scontent.fbkk2-7.fna.fbcdn.net/v/t1.0-9/10934003_816450055092072_1906053053581759871_n.jpg?_nc_cat=111&_nc_ht=scontent.fbkk2-7.fna&oh=6bc73586cd63804b82bad1d051a0d134&oe=5C967063' ], 
//             time: '31 ธันวาคม 2560', 
//             rating: 5.0,
//             comments: [
//                 { userid: '1',
//                   name: 'Mond',
//                   content: 'KUY' 
//             },
//             ]}, 
//             ),
//             seed.doc("new2", { id: '2', 
//             title: 'Find FWD in KU.', 
//             description: 'I have been waiting for you for a long time.', 
//             img: [ 'https://scontent.fbkk22-2.fna.fbcdn.net/v/t1.0-1/28577899_790880621104128_4654599030704530848_n.jpg?_nc_cat=109&_nc_ht=scontent.fbkk22-2.fna&oh=2eb8045f86f08347aae32556121a75c4&oe=5CD79B7C', 'https://scontent.fbkk22-2.fna.fbcdn.net/v/t1.0-0/p206x206/22365568_719232694935588_5027044140868658038_n.jpg?_nc_cat=106&_nc_ht=scontent.fbkk22-2.fna&oh=084be8064cd19cb9cdc605014fc7537c&oe=5C911FD3', 'https://scontent.fbkk2-7.fna.fbcdn.net/v/t1.0-9/13680801_507475342777992_3253600267447178825_n.jpg?_nc_cat=108&_nc_ht=scontent.fbkk2-7.fna&oh=a3eb2083b2b4a9712f1c7e864ed675c1&oe=5CD7830A', 'https://scontent.fbkk22-2.fna.fbcdn.net/v/t1.0-9/12495202_445229732335887_2996133826024898030_n.jpg?_nc_cat=103&_nc_ht=scontent.fbkk22-2.fna&oh=d8380948ab603478812cdf2bca402b91&oe=5CC9471B' ], 
//             time: '31 December 2018',
//             rating: 3.7,
//             comments: [
//                 { userid: '2',
//                   name: 'Jamie',
//                   content:  'Hee'
//             },
//             ]},
//             )
//         ])]).then(() => {
//             console.log("Successfully imported documents.");
//         }).catch(e => {
//             console.log("Failed to import documents: " + e);
//         });