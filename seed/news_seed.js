const { admin } = require('./config/firebaseConfig.js')

const newsCollection = admin.firestore().collection('news')

const news = [
  {
    title: 'Best OOP2 Tutor Ever.',
    description: 'Come and join to our darkside in 1/1/2019.',
    imgs: [
      'https://scontent.fbkk22-1.fna.fbcdn.net/v/t1.0-9/16684191_1431759500227788_4523539130141331084_n.jpg?_nc_cat=111&_nc_ht=scontent.fbkk22-1.fna&oh=cce56279a45f428f8ddd8988aef5d567&oe=5CBF2A37',
      'https://scontent.fbkk22-1.fna.fbcdn.net/v/t1.0-9/10934003_816450055092072_1906053053581759871_n.jpg?_nc_cat=111&_nc_ht=scontent.fbkk22-1.fna&oh=6f43cb819c1d4a408259b49af4378c60&oe=5CBDFD63',
      'https://scontent.fbkk22-2.fna.fbcdn.net/v/t1.0-9/1526768_776164669120611_2894389809615234852_n.jpg?_nc_cat=109&_nc_ht=scontent.fbkk22-2.fna&oh=a503cedd875338bf1c0f37143d58dd00&oe=5C9099AC'
    ],
    timeStamp: null,
    rating: [
      { user_id: '1', name: 'Jamie', rating: 4 },
      { user_id: '2', name: 'Mond', rating: 1 }
    ],
    comments: [{ user_id: '1', name: 'Mond', msg: 'Kuy' }]
  },
  {
    title: 'Find FWD in KU.',
    description: 'I have been waiting for you for a long time.',
    imgs: [
      'https://scontent.fbkk22-2.fna.fbcdn.net/v/t1.0-1/28577899_790880621104128_4654599030704530848_n.jpg?_nc_cat=109&_nc_ht=scontent.fbkk22-2.fna&oh=2eb8045f86f08347aae32556121a75c4&oe=5CD79B7C',
      'https://scontent.fbkk22-2.fna.fbcdn.net/v/t1.0-0/p206x206/22365568_719232694935588_5027044140868658038_n.jpg?_nc_cat=106&_nc_ht=scontent.fbkk22-2.fna&oh=084be8064cd19cb9cdc605014fc7537c&oe=5C911FD3',
      'https://scontent.fbkk22-1.fna.fbcdn.net/v/t1.0-9/13015550_476503695875157_9158396802062028871_n.jpg?_nc_cat=101&_nc_ht=scontent.fbkk22-1.fna&oh=bebd43bd0bc116b8f36bfd4569f51c10&oe=5CCC7315'
    ],
    timeStamp: null,
    rating: [
      { user_id: '2', name: 'Jamie', rating: 3.5 },
      { user_id: '1', name: 'Mond', rating: 5 }
    ],
    comments: [{ user_id: '2', name: 'Jamie', msg: 'Hee' }]
  }
]

for (var i = 0; i < news.length; i++) {
  var timeStamp = admin.firestore.FieldValue.serverTimestamp()
  news[i].timeStamp = timeStamp // store a timestamp as a field in the documents.
  newsCollection
    .add(news[i])
    .then(function (docRef) {
      console.log('Document written with ID: ', docRef.id)
    })
    .catch(function (error) {
      console.error('Error adding document: ', error)
    })
}
