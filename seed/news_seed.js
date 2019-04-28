const { admin,firebase} = require('./config/firebaseConfig.js')
const newsCollection = firebase.ref('news')

const news = [
  {
    title: 'Go! Go! Go! Golang!',
    description: 'กิจกรรมนี้ เป็นกิจกรรมสุดท้ายของเทอมปลาย 61 แล้ว มีพี่ติ๊ด Waewprach Suthirawut และ พี่แปลน Monthol Charattrakool มาสอน Golang ค่ะ พี่ๆวิทยากรบอกว่า สอนตั้งแต่ basics ไปจนถึง application ใครสนใจ ลงทะเบียนได้ที่ http://bit.ly/2Cwc322 ค่ะ',
    imgs: 'https://scontent.fbkk2-8.fna.fbcdn.net/v/t1.0-9/55503378_1243562959126681_5093210860864667648_o.jpg?_nc_cat=100&_nc_ht=scontent.fbkk2-8.fna&oh=4254a700da68dd548a24545f422110c9&oe=5D3D6652',
    timeStamp: null,
    rating: [
      { user_id: 'PHOqBCVLGUNqhZzxhvYyiy56tQr2'},
      { user_id: 'jnZzrhKxSXWdIBXvjtFuOAoQ8572'}
    ],
    comments: [{ user_id:'jnZzrhKxSXWdIBXvjtFuOAoQ8572', msg: 'Kub' }],
    author:'Supaporn Erjongmanee',
    tag:['Tutor'],
    catalog:'Tutors',
    location:'Department of Computer Engineering'
  },
  {
    title: 'สถาบัน Asian Institute of Technology (AIT)เปิดรับสมัครทุนรัฐบาลไทย',
    description: 'อ่านรายละเอียดได้ที่: https://www.ait.ac.th/admissio…/scholarships/rtg-fellowship/',
    imgs: 'https://scontent.fbkk2-8.fna.fbcdn.net/v/t1.0-9/58578348_333106480724305_5982360037069160448_n.jpg?_nc_cat=105&_nc_ht=scontent.fbkk2-8.fna&oh=4315205352f5be48bdc2f87df783078e&oe=5D752E64'
    ,
    timeStamp: null,
    rating: [
      { user_id: 'jnZzrhKxSXWdIBXvjtFuOAoQ8572' },
      { user_id: 'tHh3TUhjaAR0dJCMkaZNFWOahtk2' }
    ],
    comments: [{ user_id: 'tHh3TUhjaAR0dJCMkaZNFWOahtk2', msg: 'Hi' }],
    author:'Pirawat Watanapongse‎',
    tag:['Job'],
    catalog:'Official News',
    location:'Department of Computer Engineering'
  },
  {
    title: 'สถาบัน Asian Institute of Technology (AIT)เปิดรับสมัครทุนรัฐบาลไทย',
    description: 'อ่านรายละเอียดได้ที่: https://www.ait.ac.th/admissio…/scholarships/rtg-fellowship/',
    imgs: 'https://scontent.fbkk2-8.fna.fbcdn.net/v/t1.0-9/58578348_333106480724305_5982360037069160448_n.jpg?_nc_cat=105&_nc_ht=scontent.fbkk2-8.fna&oh=4315205352f5be48bdc2f87df783078e&oe=5D752E64'
    ,
    timeStamp: null,
    rating: [
      { user_id: 'jnZzrhKxSXWdIBXvjtFuOAoQ8572' },
      { user_id: 'tHh3TUhjaAR0dJCMkaZNFWOahtk2' }
    ],
    comments: [{ user_id: 'tHh3TUhjaAR0dJCMkaZNFWOahtk2', msg: 'Hi' }],
    author:'Pirawat Watanapongse‎',
    tag:['Job'],
    catalog:'Official News',
    location:'Department of Computer Engineering'
  },
  {
    title: 'สถาบัน Asian Institute of Technology (AIT)เปิดรับสมัครทุนรัฐบาลไทย',
    description: 'อ่านรายละเอียดได้ที่: https://www.ait.ac.th/admissio…/scholarships/rtg-fellowship/',
    imgs: 'https://scontent.fbkk2-8.fna.fbcdn.net/v/t1.0-9/58578348_333106480724305_5982360037069160448_n.jpg?_nc_cat=105&_nc_ht=scontent.fbkk2-8.fna&oh=4315205352f5be48bdc2f87df783078e&oe=5D752E64'
    ,
    timeStamp: null,
    rating: [
      { user_id: 'jnZzrhKxSXWdIBXvjtFuOAoQ8572' },
      { user_id: 'tHh3TUhjaAR0dJCMkaZNFWOahtk2' }
    ],
    comments: [{ user_id: 'tHh3TUhjaAR0dJCMkaZNFWOahtk2', msg: 'Hi' }],
    author:'Pirawat Watanapongse‎',
    tag:['Job'],
    catalog:'Official News',
    location:'Department of Computer Engineering'
  }, {
    title: 'สถาบัน Asian Institute of Technology (AIT)เปิดรับสมัครทุนรัฐบาลไทย',
    description: 'อ่านรายละเอียดได้ที่: https://www.ait.ac.th/admissio…/scholarships/rtg-fellowship/',
    imgs: 'https://scontent.fbkk2-8.fna.fbcdn.net/v/t1.0-9/58578348_333106480724305_5982360037069160448_n.jpg?_nc_cat=105&_nc_ht=scontent.fbkk2-8.fna&oh=4315205352f5be48bdc2f87df783078e&oe=5D752E64'
    ,
    timeStamp: null,
    rating: [
      { user_id: 'jnZzrhKxSXWdIBXvjtFuOAoQ8572' },
      { user_id: 'tHh3TUhjaAR0dJCMkaZNFWOahtk2' }
    ],
    comments: [{ user_id: 'tHh3TUhjaAR0dJCMkaZNFWOahtk2', msg: 'Hi' }],
    author:'Pirawat Watanapongse‎',
    tag:['Job'],
    catalog:'Official News',
    location:'Department of Computer Engineering'
  }
]

for (var i = 0; i < news.length; i++) {
  var timeStamp = new Date()
  news[i].timeStamp = ''+timeStamp.getDay()+'/'+(timeStamp.getMonth()+1)+'/'+timeStamp.getFullYear()+'  time '+timeStamp.getHours()+':'+timeStamp.getMinutes() // store a timestamp as a field in the documents.
  newsCollection
    .child(news[i].catalog)
    .push(news[i])
    .then(function (docRef) {
      console.log('Document written with ID: ', docRef.id)
    })
    .catch(function (error) {
      console.error('Error adding document: ', error)
    })
}
