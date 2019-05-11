const { admin,firebase} = require('./config/firebaseConfig.js')
const newsCollection = firebase.ref('news')
const uuid =require('uuid')

const news = [
  {
    title: 'หนุ่มหล่อ กล้ามล่ำ KU',
    description: 'ลองตกเก้าอี้ในยิมสิครับ รู้สึกเหมือนบินได้ทันที 🕊🕊 IG : shoot.ps ⭐️ไม่อยากพลาดหนุ่มแซ่บกด "See First"',
    imgs: 'https://scontent.fbkk2-7.fna.fbcdn.net/v/t1.0-9/57649192_2161201780630679_4198258870310666240_o.jpg?_nc_cat=106&_nc_ht=scontent.fbkk2-7.fna&oh=401ab1d4002de2161709e61536b7b475&oe=5D5A24F8',
    timeStamp: null,
    rating: [
      { user_id: '6okut6RLxCYUYXEKZIjW7c2NTsC2'},
      { user_id: 'LGqPchRYJabjbEo34fOIF5IUxFk1'}
    ],
    comments: [{ user_id:'LGqPchRYJabjbEo34fOIF5IUxFk1', msg: 'Kub' }],
    user_id: '6okut6RLxCYUYXEKZIjW7c2NTsC2',
    tag:['Muscle','KUSEXYBOY'],
    catalog:'Love',
  },
  {
    title: 'ตามหาหนุ่มหล่อ กล้ามล่ำ KU',
    description: '"ครูดุหรอ หนูไหวนะ" 💚👨🏻‍🏫-ไอซ์ IG : icekittapart ⭐️ไม่อยากพลาดหนุ่มแซ่บกด "See First"',
    imgs: 'https://scontent.fbkk2-7.fna.fbcdn.net/v/t1.0-9/59823521_2334865819928401_1875872579080683520_o.jpg?_nc_cat=109&_nc_ht=scontent.fbkk2-7.fna&oh=4e81f002ffb220ee36b83c777db76223&oe=5D5AACD6',
    timeStamp: null,
    rating: [
      { user_id: '6okut6RLxCYUYXEKZIjW7c2NTsC2'},
      { user_id: 'LGqPchRYJabjbEo34fOIF5IUxFk1'}
    ],
    comments: [{ user_id:'LGqPchRYJabjbEo34fOIF5IUxFk1', msg: 'Kub' }],
    user_id: '6okut6RLxCYUYXEKZIjW7c2NTsC2',
    tag:['Muscle','KUSEXYBOY'],
    catalog:'Love',
  },
  {
    title: 'ตามหาหนุ่มหล่อ กล้ามล่ำ KU',
    description: '“สายตาที่เธอมองมา รู้ไหมว่ามันทำให้เราใจสั่น” 💚-โดม IG : ddome_w ⭐️ไม่อยากพลาดหนุ่มแซ่บกด "See First"',
    imgs: 'https://scontent.fbkk2-8.fna.fbcdn.net/v/t1.0-9/59928256_2334630223285294_7143018792115765248_o.jpg?_nc_cat=105&_nc_ht=scontent.fbkk2-8.fna&oh=a59f2d7ddc9bb8e53df65572b70a5c74&oe=5D6DBEBA',
    timeStamp: null,
    rating: [
      { user_id: '6okut6RLxCYUYXEKZIjW7c2NTsC2'},
      { user_id: 'LGqPchRYJabjbEo34fOIF5IUxFk1'}
    ],
    comments: [{ user_id:'LGqPchRYJabjbEo34fOIF5IUxFk1', msg: 'Kub' }],
    user_id: '6okut6RLxCYUYXEKZIjW7c2NTsC2',
    tag:['Muscle','KUSEXYBOY'],
    catalog:'Love',
  },
  {
    title: 'สถาบัน Asian Institute of Technology (AIT)เปิดรับสมัครทุนรัฐบาลไทย',
    description: 'อ่านรายละเอียดได้ที่: https://www.ait.ac.th/admissio…/scholarships/rtg-fellowship/',
    imgs: 'https://scontent.fbkk2-8.fna.fbcdn.net/v/t1.0-9/58578348_333106480724305_5982360037069160448_n.jpg?_nc_cat=105&_nc_ht=scontent.fbkk2-8.fna&oh=4315205352f5be48bdc2f87df783078e&oe=5D752E64'
    ,
    timeStamp: null,
    rating: [
      { user_id: '6okut6RLxCYUYXEKZIjW7c2NTsC2'},
      { user_id: 'LGqPchRYJabjbEo34fOIF5IUxFk1'}
    ],
    comments: [{ user_id: 'LGqPchRYJabjbEo34fOIF5IUxFk1', msg: 'Hi' }],
    user_id: 'LGqPchRYJabjbEo34fOIF5IUxFk1',
    tag:['Job'],
    catalog:'Official News',
  },
  {
    title: 'สถาบัน Asian Institute of Technology (AIT)เปิดรับสมัครทุนรัฐบาลไทย',
    description: 'อ่านรายละเอียดได้ที่: https://www.ait.ac.th/admissio…/scholarships/rtg-fellowship/',
    imgs: 'https://scontent.fbkk2-8.fna.fbcdn.net/v/t1.0-9/58578348_333106480724305_5982360037069160448_n.jpg?_nc_cat=105&_nc_ht=scontent.fbkk2-8.fna&oh=4315205352f5be48bdc2f87df783078e&oe=5D752E64'
    ,
    timeStamp: null,
    rating: [
      { user_id: '6okut6RLxCYUYXEKZIjW7c2NTsC2'},
      { user_id: 'LGqPchRYJabjbEo34fOIF5IUxFk1'}
    ],
    comments: [{ user_id: 'LGqPchRYJabjbEo34fOIF5IUxFk1', msg: 'Hi' }],
    user_id: '6okut6RLxCYUYXEKZIjW7c2NTsC2',
    tag:['Job'],
    catalog:'Learning',
  },
  {
    title: 'สถาบัน Asian Institute of Technology (AIT)เปิดรับสมัครทุนรัฐบาลไทย',
    description: 'อ่านรายละเอียดได้ที่: https://www.ait.ac.th/admissio…/scholarships/rtg-fellowship/',
    imgs: 'https://scontent.fbkk2-8.fna.fbcdn.net/v/t1.0-9/58578348_333106480724305_5982360037069160448_n.jpg?_nc_cat=105&_nc_ht=scontent.fbkk2-8.fna&oh=4315205352f5be48bdc2f87df783078e&oe=5D752E64'
    ,
    timeStamp: null,
    rating: [
      { user_id: '6okut6RLxCYUYXEKZIjW7c2NTsC2'},
      { user_id: 'LGqPchRYJabjbEo34fOIF5IUxFk1'}
    ],
    comments: [{ user_id: 'LGqPchRYJabjbEo34fOIF5IUxFk1', msg: 'Hi' }],
    user_id: '6okut6RLxCYUYXEKZIjW7c2NTsC2',
    tag:['Job'],
    catalog:'Social',
  }, {
    title: 'หอพัก คอนโด ห้องเช่า ที่พัก บ้านเช่า กรุงเทพ กทม Bangkok',
    description: 'คอนโดใหม่ BTSตลาดพลู—จรัญฯ 3เฟอร์นิเจอร์+เครื่องใช้ไฟฟ้า ฟิตเนส/สระว่ายน้ำ/ที่จอดรถรวมทุกอย่างแล้ว 6,500/เดือน สนใจติดต่อ facebook:‎Marvel Strange‎ ',
    imgs: 'https://scontent.fbkk2-7.fna.fbcdn.net/v/t1.0-9/48394853_2028681090558985_5874994977179697152_n.jpg?_nc_cat=108&_nc_ht=scontent.fbkk2-7.fna&oh=5b715f68d94c708086ae91ff555e972b&oe=5D759E60'
    ,
    timeStamp: null,
    rating: [
      { user_id: '6okut6RLxCYUYXEKZIjW7c2NTsC2'},
      { user_id: 'LGqPchRYJabjbEo34fOIF5IUxFk1'}
    ],
    comments: [{ user_id: 'LGqPchRYJabjbEo34fOIF5IUxFk1', msg: 'Hi' }],
    user_id: '6okut6RLxCYUYXEKZIjW7c2NTsC2',
    tag:['Place'],
    catalog:'Accommodation',
  },{
    title: 'คอนโด คุณภาพ จาก cp land บนทำเล ศักยภาพ ใกล้เทสโก้โลตัส และบิ๊กซี 304 โอกาศดีๆ มาถึงแล้ว',
    description: 'โอกาศดีๆ มาถึงแล้ว มาก่อนมีสิทธิ์เลือกห้อง เลือกวิวสวยๆ ก่อนใคร ราคาเริ่มต้น 1.25 ลบ* แถมฟรีเฟอร์นิเจอร์*สิ่งอำนวยความสะดวกอื่นๆ- ฟิตเนส - สระว่ายน้ำ- Lobby พักผ่อน Wi-Fi Internet free- ระบบรักษาความปลอดภัย เข้า-ออก Key Card 24 ชม.สอบถามรายละเอียด เพิ่มเติมได้ที่ 👉โทร 095-207-9238 ,037-651-231👉Line id: @cplandรับข้อมูลโครงการคอนโดเพิ่มเติมได้ที่ http://www.cpland.co.th/…/%E0%B8%84%E0%B8%AD%E0%B8%99%E0%B9…',
    imgs: 'https://scontent.fbkk2-6.fna.fbcdn.net/v/t31.0-8/17814280_1873181909636388_769348550871809770_o.jpg?_nc_cat=107&_nc_ht=scontent.fbkk2-6.fna&oh=80206c4aacf0ab74da1a3934a79ca3c3&oe=5D5C4F93'
    ,
    timeStamp: null,
    rating: [
      { user_id: '6okut6RLxCYUYXEKZIjW7c2NTsC2'},
      { user_id: 'LGqPchRYJabjbEo34fOIF5IUxFk1'}
    ],
    comments: [{ user_id: 'LGqPchRYJabjbEo34fOIF5IUxFk1', msg: 'Hi' }],
    user_id: '6okut6RLxCYUYXEKZIjW7c2NTsC2',
    tag:['Place'],
    catalog:'Accommodation',
  },{
    title: 'ขายคอนโด Centric รัชดา-สุทธิสาร พร้อมfitnessคุณภาพ',
    description: 'ขายคอนโด Centric รัชดา-สุทธิสาร ตกแต่ง’ติด’ MRT สุทธิสาร !! (เจ้าของขายเอง เจ้าของอยู่น้อย******มาขอรูปเพิ่มเติมได้เลยนะ☎️ สนใจติดต่อ 0805446963 💸 135,000 บาท / ตร.ม. (32 ตร. ม)',
    imgs: 'https://scontent.fbkk2-8.fna.fbcdn.net/v/t1.0-9/59602897_2175442195873304_3397012066744139776_o.jpg?_nc_cat=105&_nc_ht=scontent.fbkk2-8.fna&oh=58bf4bfdfb049a83a4073bdf41d2c836&oe=5D63525E'
    ,
    timeStamp: null,
    rating: [
      { user_id: '6okut6RLxCYUYXEKZIjW7c2NTsC2'},
      { user_id: 'LGqPchRYJabjbEo34fOIF5IUxFk1'}
    ],
    comments: [{ user_id: 'LGqPchRYJabjbEo34fOIF5IUxFk1', msg: 'Hi' }],
    user_id: '6okut6RLxCYUYXEKZIjW7c2NTsC2',
    tag:['Place','CalGuLess'],
    catalog:'Accommodation',
  }, {
    title: 'ข้าวหน้าหมูหวานครัวคุณชูท',
    description: 'วันนี้จะแหวกจาก Content เพิ่มน้ำหนักเล็กน้อย มาแนวสุขภาพแทน มีหลักการการกินรูปแบบนึงซึ่งส่วนตัวคิดว่าเหมาะกับคนปกติ ไม่ได้ออกกำลังกาย แต่อยากสุขภาพดีมาฝากครับ เค้าเรียก Healthy Eating Plate(อร่อยมากต้องลองครับ)',
    imgs: 'https://scontent.fbkk2-7.fna.fbcdn.net/v/t1.0-9/59948659_2182009168549940_7945359197435068416_o.jpg?_nc_cat=106&_nc_ht=scontent.fbkk2-7.fna&oh=47e3417c6ca5e355c17e2986d3a2b0d3&oe=5D5D7E4C'
    ,
    timeStamp: null,
    rating: [
      { user_id: '6okut6RLxCYUYXEKZIjW7c2NTsC2'},
      { user_id: 'LGqPchRYJabjbEo34fOIF5IUxFk1'}
    ],
    comments: [{ user_id: 'LGqPchRYJabjbEo34fOIF5IUxFk1', msg: 'Hi' }],
    user_id: '6okut6RLxCYUYXEKZIjW7c2NTsC2',
    tag:['Health','กิน70ออกกำลังกาย30'],
    catalog:'Restaurants',
  }, {
    title: 'Bingsuu 😝😝 จากAfter you',
    description: 'เป็นอะไรที่สุดยอดมากครับนุ่มละมุนลิ้นอร่อยมาก(My muscle don t want sugar but I want)',
    imgs: 'https://scontent.fbkk2-7.fna.fbcdn.net/v/t1.0-9/58906011_2174410445976479_4871437432806965248_n.jpg?_nc_cat=106&_nc_ht=scontent.fbkk2-7.fna&oh=30588a984b15587dfce9d555a615b5cc&oe=5D601C47'
    ,
    timeStamp: null,
    rating: [
      { user_id: '6okut6RLxCYUYXEKZIjW7c2NTsC2'},
      { user_id: 'LGqPchRYJabjbEo34fOIF5IUxFk1'}
    ],
    comments: [{ user_id: 'LGqPchRYJabjbEo34fOIF5IUxFk1', msg: 'Hi' }],
    user_id: '6okut6RLxCYUYXEKZIjW7c2NTsC2',
    tag:['Health','ชุมชนคนหมื่นแคล','เผาผลาญมันเกิน'],
    catalog:'Restaurants',
  },{
    title: 'Eat am are',
    description: 'กินข้าวกันยังคร้าบ 🍱 วันนี้จะมาแนะนำร้านeat am areเป็นร้านอาหารที่อร่อยมากโลเคชั่น อนุเสาวรีย์ชัย',
    imgs: 'https://scontent.fbkk2-6.fna.fbcdn.net/v/t1.0-9/58033089_2162348790515978_4832260918681272320_o.jpg?_nc_cat=107&_nc_ht=scontent.fbkk2-6.fna&oh=1129e98555a8f999d71b0aa3a5edbbbb&oe=5D771027'
    ,
    timeStamp: null,
    rating: [
      { user_id: '6okut6RLxCYUYXEKZIjW7c2NTsC2'},
      { user_id: 'LGqPchRYJabjbEo34fOIF5IUxFk1'}
    ],
    comments: [{ user_id: 'LGqPchRYJabjbEo34fOIF5IUxFk1', msg: 'Hi' }],
    user_id: '6okut6RLxCYUYXEKZIjW7c2NTsC2',
    tag:['CalGuLess'],
    catalog:'Restaurants',
  },
  {
    title: '4 คอร์สเรียนเขียนโปรแกรมที่ยินดีแนะนำ',
    description: 'สอนตั่งแต่พื้นฐานยันขั้นเทพเพื่อใช้งานจริงมาดูกันก่อนครับว่ามีอะไรบ้างที่สำคัญไม่ต้องเดินทาง เรียนชิวๆอยู่บ้าน คอร์ส1 เขียนโปรแกรมทางธุรกิจ ✔️ รายละเอียดคลิก: http://bit.ly/Couse_1ราคา 350 บาท________________________________คอร์ส2 เขียนบอทเกมส์ ✔️ รายละเอียดคลิก: http://bit.ly/Couse_ราคา 450 บาท________________________________คอร์ส3 Basic For Android สำหรับผู้เริ่มต้น✔️ รายละเอียดคลิก: http://bit.ly/Couse_3ราคาเพียง 690 สำหรับลูกค้าใหมราคาเพียง 500 สำหรับลูกค้าเดิม________________________________คอร์ส4 Android ติดต่อฐานข้อมูล(มี Host ให้ฟรี)✔️ รายละเอียดคลิก: http://bit.ly/Couse_4ราคาเพียง 690 สำหรับลูกค้าใหม่ราคาเพียง 500 สำหรับลูกค้าเดิม',
    imgs: 'https://scontent.fbkk2-8.fna.fbcdn.net/v/t1.0-9/16830751_1574336672583747_7655646447123783029_n.png?_nc_cat=105&_nc_ht=scontent.fbkk2-8.fna&oh=1aadb4f398028ba08f13018ede8a4992&oe=5D29629A'
    ,
    timeStamp: null,
    rating: [
      { user_id: '6okut6RLxCYUYXEKZIjW7c2NTsC2'},
      { user_id: 'LGqPchRYJabjbEo34fOIF5IUxFk1'}
    ],
    comments: [{ user_id: 'LGqPchRYJabjbEo34fOIF5IUxFk1', msg: 'Hi' }],
    user_id: '6okut6RLxCYUYXEKZIjW7c2NTsC2',
    tag:['Tutor'],
    catalog:'Learning',
  },
  {
    title: 'Go! Go! Go! Golang!',
    description: 'กิจกรรมนี้ เป็นกิจกรรมสุดท้ายของเทอมปลาย 61 แล้ว มีพี่ติ๊ด Waewprach Suthirawut และ พี่แปลน Monthol Charattrakool มาสอน Golang ค่ะ พี่ๆวิทยากรบอกว่า สอนตั้งแต่ basics ไปจนถึง application ',
    imgs: 'https://scontent.fbkk2-8.fna.fbcdn.net/v/t1.0-9/55503378_1243562959126681_5093210860864667648_o.jpg?_nc_cat=100&_nc_ht=scontent.fbkk2-8.fna&oh=4254a700da68dd548a24545f422110c9&oe=5D3D6652',
    timeStamp: null,
    rating: [
      { user_id: '6okut6RLxCYUYXEKZIjW7c2NTsC2'},
      { user_id: 'LGqPchRYJabjbEo34fOIF5IUxFk1'}
    ],
    comments: [{ user_id:'LGqPchRYJabjbEo34fOIF5IUxFk1', msg: 'Kub' }],
    user_id: '6okut6RLxCYUYXEKZIjW7c2NTsC2',
    tag:['Tutor'],
    catalog:'Learning',
  },
  {
    title: 'รับจ้าง trainer fitness',
    description: 'เริ่มต้นอยากเล่นเวท ทำไงดี?? 🧐"ถ้าให้แนะนำโดยส่วนตัวคือ เล่น "ทั้งตัว" หรือ Fullbody ก่อนโดยโฟกัสท่าที่ได้กล้ามเนื้อมัดใหญ่นั่นคือ อก หลัง และขาแน่นอนว่าช่วงเดือนแรกๆจะยังไม่ค่อยเห็นอะไร เพราะเราก็เป็นน 555แต่ขออย่างเดียวคือโฟกัส Cal in ถึง สารอาหารถึง และโฟกัส performance ในยิมว่าเราจะเพิ่มน้ำหนักที่ยกให้ได้ทุกครั้งหรือถ้าไม่ได้จริงๆก็เท่าเดิม แค่นี้จริงๆครับ ผลลัพธ์จะค่อยๆเกิดเองส่วนเรื่องสารอาหารถึงคืออะไรเดี๋ยวมาติดตามใน Content ถัดไปๆ 😜😜',
    imgs: 'https://scontent.fbkk2-8.fna.fbcdn.net/v/t1.0-9/59602897_2175442195873304_3397012066744139776_o.jpg?_nc_cat=105&_nc_ht=scontent.fbkk2-8.fna&oh=58bf4bfdfb049a83a4073bdf41d2c836&oe=5D63525E',
    timeStamp: null,
    rating: [
      { user_id: '6okut6RLxCYUYXEKZIjW7c2NTsC2'},
      { user_id: 'LGqPchRYJabjbEo34fOIF5IUxFk1'}
    ],
    comments: [{ user_id:'LGqPchRYJabjbEo34fOIF5IUxFk1', msg: 'Kub' }],
    user_id: '6okut6RLxCYUYXEKZIjW7c2NTsC2',
    tag:['Tutor','Sport'],
    catalog:'Learning',
  }
]

for (var i = 0; i < news.length; i++) {
  var timeStamp = new Date()
  news[i].timeStamp = ''+timeStamp.getDay()+'/'+(timeStamp.getMonth()+1)+'/'+timeStamp.getFullYear()+'  time '+timeStamp.getHours()+':'+timeStamp.getMinutes() // store a timestamp as a field in the documents.
  newsCollection
    .child(news[i].catalog)
    .child(uuid.v4()).set(news[i])
    .then(function (docRef) {
      console.log('success')
    })
    .catch(function (error) {
      console.error('Error adding document: ', error)
    })
}
