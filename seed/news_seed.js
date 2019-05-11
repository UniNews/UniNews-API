const { admin, firebase } = require('./config/firebaseConfig.js')
const newsCollection = firebase.ref('news')
const uuid = require('uuid')

const news = [
  /* LOVE */

  {
    title: 'KUSEXYBOY - หนุ่มหล่อ กล้ามล่ำ KU 💪💚',
    description:
      '"ลองตกเก้าอี้ในยิมสิครับ รู้สึกเหมือนบินได้ทันที" 😤🏋️ IG : shoot.ps   ⭐️ไม่อยากพลาดหนุ่มแซ่บกด https://www.facebook.com/kusexyboy/',
    imgs:
      'https://scontent.fbkk2-7.fna.fbcdn.net/v/t1.0-9/57649192_2161201780630679_4198258870310666240_o.jpg?_nc_cat=106&_nc_ht=scontent.fbkk2-7.fna&oh=401ab1d4002de2161709e61536b7b475&oe=5D5A24F8',
    timeStamp: null,
    rating: [],
    comments: [],
    user_id: 'qU4bYZdBk8S5sYFvKjnpshORQgO2',
    tag: ['KUSEXYBOY', 'Muscle', 'KU72', 'วิศวะ'],
    catalog: 'Love'
  },
  {
    title: 'KUSEXYBOY - หนุ่มแว่นของหัวใจ 👓 💦 💦',
    description:
      '"อยากจะเป็นแว่นตาให้เธอใส่ ถึงจะไม่ได้อยู่ในใจ แต่ก็อยู่ในสายตา" 💚👨🏻‍🏫 IG : kongvarit ⭐️ไม่อยากพลาดหนุ่มแซ่บกด https://www.facebook.com/kusexyboy/',
    imgs:
      'https://scontent.fbkk2-7.fna.fbcdn.net/v/t1.0-9/1526768_776164669120611_2894389809615234852_n.jpg?_nc_cat=109&_nc_ht=scontent.fbkk2-7.fna&oh=e4a9dd5e6ac8008d2dbb031941a25342&oe=5D565AAC',
    timeStamp: null,
    rating: [],
    comments: [],
    user_id: 'qU4bYZdBk8S5sYFvKjnpshORQgO2',
    tag: ['KUSEXYBOY', 'ปี3', 'หนุ่มแว่น'],
    catalog: 'Love'
  },
  {
    title: 'KUSEXYBOY - หมูตุ๋น กินยังไงก็ไม่เบื่อ 🐷🤤',
    description:
      '"กินข้าวมันไก่แล้วอ้วน มากินเราสิเนื้อล้วนๆ มีแต่โปรตีน" 🐔🐣 IG : nongjamie ⭐️ไม่อยากพลาดหนุ่มแซ่บกด https://www.facebook.com/kusexyboy/',
    imgs:
      'https://scontent.fbkk2-8.fna.fbcdn.net/v/t1.0-9/13239447_487602491431944_1659742964278277597_n.jpg?_nc_cat=105&_nc_ht=scontent.fbkk2-8.fna&oh=3f67eb59fa63ce6faced51c58d33e4b2&oe=5D698241',
    timeStamp: null,
    rating: [],
    comments: [],
    user_id: 'qU4bYZdBk8S5sYFvKjnpshORQgO2',
    tag: ['KUSEXYBOY', 'SKE14', 'KU72'],
    catalog: 'Love'
  },
  /* Official News */
  {
    title: 'ประกาศปิดบริการห้องสมุด วันที่ 4-6 พฤษภาคม 2562 ',
    description:
      '📣 ตามประกาศมหาวิทยาลัย เรื่องงดการเรียนการสอน ในวันที่ 4 – 6 พฤษภาคม 2562 เพื่อให้คณาจารย์ บุคลากร และนิสิต สามารถเข้าร่วมกิจกรรมต่าง ๆ และร่วมถวายพระพรชัยมงคล ในช่วงเวลาของพระราชพิธีบรมราชาภิเษกได้อย่างสมพระเกียรตินั้น สำนักหอสมุดจึงประกาศปิดบริการห้องสมุด ในวันที่ 4 – 6 พฤษภาคม 2562 เพื่อให้นิสิตและบุคลากร ได้มีส่วนร่วมในช่วงการพระราชพิธีบรมราชาภิเษก',
    imgs:
      'https://scontent.fbkk2-6.fna.fbcdn.net/v/t1.0-9/58772288_2190035717699313_278734577122410496_n.jpg?_nc_cat=104&_nc_ht=scontent.fbkk2-6.fna&oh=7dd62c30695e409c4cc2a3566a0c6141&oe=5D60070F',
    timeStamp: null,
    rating: [],
    comments: [],
    user_id: 'VK8FC3OIUrf6CJfx6y2QVl56SED3',
    tag: ['Library', 'Study'],
    catalog: 'Official News'
  },
  {
    title:
      'รู้ไว้ สำคัญมาก!!! นิสิตปี 3 (รหัส59) และ นิสิตปี4-5ที่มีสิทธิ์สอบ ต้องยืนยันสิทธิ์ในการสอบ KU-EXITE ',
    description:
      '👉นิสิตปี 3 (รหัส59) และ นิสิตปี4-5ที่มีสิทธิ์สอบ ต้องยืนยันสิทธิ์ในการสอบ KU-EXITE ปีนี้ นิสิตปีดังกล่าวต้องสอบ KU-EXITE ทุกคน ⏰ ภายในวันที่ 25-29 มีนาคม 62 📌https://stdexam.ku.ac.th/english/ ลิงค์ยืนยันสิทธิ์ 💚KU-EXITE จะจัดสอบในวันที่ 25-26 พ.ค. 62 🏫สถานที่จัดสอบ อาคารจักรพันธ์เพ็ญศิริ ',
    imgs:
      'https://scontent.fbkk2-6.fna.fbcdn.net/v/t1.0-9/54430467_2389780387719005_1852506436572020736_n.png?_nc_cat=111&_nc_ht=scontent.fbkk2-6.fna&oh=55026a6c6f7ff08bcaac8094fd976f15&oe=5D77E0DF',
    timeStamp: null,
    rating: [],
    comments: [],
    user_id: '0eM5t9H3c3Y4bRMTRGzdjMeKOWj1',
    tag: ['Exam', 'Student'],
    catalog: 'Official News'
  },
  {
    title: '📢📢แบบประเมินการสอนผ่านเว็บ ครั้งที่ 2 ',
    description:
      'แบบประเมินการสอนผ่านเว็บ ครั้งที่ 2 มาแล้ว วันที่ 6 - 12 พ.ค. 2562 👉 เห็นแล้วประเมินเลย เดี๋ยวลืมนะ 💚 📌https://eassess.ku.ac.th/',
    imgs:
      'https://scontent.fbkk2-6.fna.fbcdn.net/v/t1.0-9/59629505_2459585014071875_1368197630693212160_n.jpg?_nc_cat=111&_nc_ht=scontent.fbkk2-6.fna&oh=fbf24d6d397bc6a5b98076e1cac42831&oe=5D74120B',
    timeStamp: null,
    rating: [],
    comments: [],
    user_id: '0eM5t9H3c3Y4bRMTRGzdjMeKOWj1',
    tag: ['Evaluation', 'KU'],
    catalog: 'Official News'
  },
  /* Accommodation */
  {
    title: 'Maxxi คอนโดใกล้ม.เกษตรบางเขน ',
    description:
      'คอนโดใหม่ BTSตลาดพลู—จรัญฯ 3เฟอร์นิเจอร์+เครื่องใช้ไฟฟ้า ฟิตเนส/สระว่ายน้ำ/ที่จอดรถรวมทุกอย่างแล้ว 6,500/เดือน สนใจติดต่อ 085-965-2514‎ ',
    imgs:
      'https://scontent.fbkk2-7.fna.fbcdn.net/v/t1.0-9/48394853_2028681090558985_5874994977179697152_n.jpg?_nc_cat=108&_nc_ht=scontent.fbkk2-7.fna&oh=5b715f68d94c708086ae91ff555e972b&oe=5D759E60',
    timeStamp: null,
    rating: [],
    comments: [],
    user_id: '8dEtAbi7ZjRhL2CYEh2ZexZJH7j1',
    tag: ['Condo', 'Promotion'],
    catalog: 'Accommodation'
  },
  {
    title: 'ขอคำแนะนำหอพักใกล้ ม.เกษตร บางเขนหน่อยครับ',
    description:
      'คือผมจะเข้า ปี1 ที่ ม.เกษตร บางเขน แล้วอยากขอคำแนะนำ และสอบถามว่า หอไหนดี หอไหนถูก เดินไปเรียนได้ (บอกเป็นชื่อหอ) ขอบคุณล่วงหน้านะครับ สำหรับความคิดเห็น',
    imgs: 'https://www.livinginsider.com/upload/topic161/tyA75152_89858.jpeg',
    timeStamp: null,
    rating: [],
    comments: [],
    user_id: 'V0F60UPbt4dRI7nDGj8JbxfWMLv2',
    tag: ['Advice', 'Help'],
    catalog: 'Accommodation'
  },
  /* Restaurant */

  {
    title: 'ครัวคุณชูท - ข้าวหน้าหมูหวานครัวคุณชูท',
    description:
      'วันนี้จะแหวกจาก Content เพิ่มน้ำหนักเล็กน้อย มาแนวสุขภาพแทน มีหลักการการกินรูปแบบนึงซึ่งส่วนตัวคิดว่าเหมาะกับคนปกติ ไม่ได้ออกกำลังกาย แต่อยากสุขภาพดีมาฝากครับ เค้าเรียก Healthy Eating Plate(อร่อยมากต้องลองครับ)',
    imgs:
      'https://scontent.fbkk2-7.fna.fbcdn.net/v/t1.0-9/59948659_2182009168549940_7945359197435068416_o.jpg?_nc_cat=106&_nc_ht=scontent.fbkk2-7.fna&oh=47e3417c6ca5e355c17e2986d3a2b0d3&oe=5D5D7E4C',
    timeStamp: null,
    rating: [],
    comments: [],
    user_id: 'EWy5fIBmHhQLYElnF3Xzwh1V2kT2',
    tag: ['Health', 'กิน70ออกกำลังกาย30'],
    catalog: 'Restaurants'
  },
  {
    title: 'รีวิว Bingsuu 😝😝 จาก After you',
    description:
      'เป็นอะไรที่สุดยอดมากครับนุ่มละมุนลิ้นอร่อยมาก (My muscle don t want sugar but I want)',
    imgs:
      'https://scontent.fbkk2-7.fna.fbcdn.net/v/t1.0-9/58906011_2174410445976479_4871437432806965248_n.jpg?_nc_cat=106&_nc_ht=scontent.fbkk2-7.fna&oh=30588a984b15587dfce9d555a615b5cc&oe=5D601C47',
    timeStamp: null,
    rating: [],
    comments: [],
    user_id: 'EWy5fIBmHhQLYElnF3Xzwh1V2kT2',
    tag: ['Health', 'ชุมชนคนหมื่นแคล', 'เผาผลาญมันเกิน'],
    catalog: 'Restaurants'
  },
  {
    title: 'แนะนำ ร้าน Eat Am Are 💦💦',
    description:
      'กินข้าวกันยังคร้าบ 🍱 วันนี้จะมาแนะนำร้าน Eat Am Are เป็นร้านอาหารที่อร่อยมากโลเคชั่น อนุเสาวรีย์ชัย',
    imgs:
      'https://scontent.fbkk2-6.fna.fbcdn.net/v/t1.0-9/58033089_2162348790515978_4832260918681272320_o.jpg?_nc_cat=107&_nc_ht=scontent.fbkk2-6.fna&oh=1129e98555a8f999d71b0aa3a5edbbbb&oe=5D771027',
    timeStamp: null,
    rating: [],
    comments: [],
    user_id: 'EWy5fIBmHhQLYElnF3Xzwh1V2kT2',
    tag: ['Review', 'EatAmAre'],
    catalog: 'Restaurants'
  },
  /* Learning */
  {
    title: '4 คอร์สเรียนเขียนโปรแกรมที่ยินดีแนะนำ',
    description:
      'สอนตั่งแต่พื้นฐานยันขั้นเทพเพื่อใช้งานจริงมาดูกันก่อนครับว่ามีอะไรบ้างที่สำคัญไม่ต้องเดินทาง เรียนชิวๆอยู่บ้าน คอร์ส1 เขียนโปรแกรมทางธุรกิจ ✔️ รายละเอียดคลิก: http://bit.ly/Couse_1ราคา 350 บาท________________________________คอร์ส2 เขียนบอทเกมส์ ✔️ รายละเอียดคลิก: http://bit.ly/Couse_ราคา 450 บาท________________________________คอร์ส3 Basic For Android สำหรับผู้เริ่มต้น✔️ รายละเอียดคลิก: http://bit.ly/Couse_3ราคาเพียง 690 สำหรับลูกค้าใหมราคาเพียง 500 สำหรับลูกค้าเดิม________________________________คอร์ส4 Android ติดต่อฐานข้อมูล(มี Host ให้ฟรี)✔️ รายละเอียดคลิก: http://bit.ly/Couse_4ราคาเพียง 690 สำหรับลูกค้าใหม่ราคาเพียง 500 สำหรับลูกค้าเดิม',
    imgs:
      'https://scontent.fbkk2-8.fna.fbcdn.net/v/t1.0-9/16830751_1574336672583747_7655646447123783029_n.png?_nc_cat=105&_nc_ht=scontent.fbkk2-8.fna&oh=1aadb4f398028ba08f13018ede8a4992&oe=5D29629A',
    timeStamp: null,
    rating: [],
    comments: [],
    user_id: 'naekL9UajGM5DwRmLWw2Oa9iusE3',
    tag: ['Tutor', 'Programming'],
    catalog: 'Learning'
  },
  {
    title: 'Go! Go! Go! Golang!',
    description:
      'กิจกรรมนี้ เป็นกิจกรรมสุดท้ายของเทอมปลาย 61 แล้ว มีพี่ติ๊ด Waewprach Suthirawut และ พี่แปลน Monthol Charattrakool มาสอน Golang ค่ะ พี่ๆวิทยากรบอกว่า สอนตั้งแต่ basics ไปจนถึง application ',
    imgs:
      'https://scontent.fbkk2-8.fna.fbcdn.net/v/t1.0-9/55503378_1243562959126681_5093210860864667648_o.jpg?_nc_cat=100&_nc_ht=scontent.fbkk2-8.fna&oh=4254a700da68dd548a24545f422110c9&oe=5D3D6652',
    timeStamp: null,
    rating: [],
    comments: [],
    user_id: 'naekL9UajGM5DwRmLWw2Oa9iusE3',
    tag: ['Tutor', 'Programming'],
    catalog: 'Learning'
  },
  {
    title: 'รับจ้าง Trainer Fitness',
    description:
      'เริ่มต้นอยากเล่นเวท ทำไงดี?? 🧐"ถ้าให้แนะนำโดยส่วนตัวคือ เล่น "ทั้งตัว" หรือ Fullbody ก่อนโดยโฟกัสท่าที่ได้กล้ามเนื้อมัดใหญ่นั่นคือ อก หลัง และขาแน่นอนว่าช่วงเดือนแรกๆจะยังไม่ค่อยเห็นอะไร เพราะเราก็เป็นน 555แต่ขออย่างเดียวคือโฟกัส Cal in ถึง สารอาหารถึง และโฟกัส performance ในยิมว่าเราจะเพิ่มน้ำหนักที่ยกให้ได้ทุกครั้งหรือถ้าไม่ได้จริงๆก็เท่าเดิม แค่นี้จริงๆครับ ผลลัพธ์จะค่อยๆเกิดเองส่วนเรื่องสารอาหารถึงคืออะไรเดี๋ยวมาติดตามใน Content ถัดไปๆ 😜😜',
    imgs:
      'https://scontent.fbkk2-8.fna.fbcdn.net/v/t1.0-9/59602897_2175442195873304_3397012066744139776_o.jpg?_nc_cat=105&_nc_ht=scontent.fbkk2-8.fna&oh=58bf4bfdfb049a83a4073bdf41d2c836&oe=5D63525E',
    timeStamp: null,
    rating: [],
    comments: [],
    user_id: 'EWy5fIBmHhQLYElnF3Xzwh1V2kT2',
    tag: ['Tutor', 'Sport', 'getFit'],
    catalog: 'Learning'
  },
  {
    title: 'มาแล้วจ้าาา..ค่ายวิศวบริการครั้งที่ 30',
    description:
      'สำหรับน้องๆที่จบการศึกษาชั้นม.6 หรือเทียบเท่า กำลังจะก้าวเข้าสู่รั้วมหาวิทยาลัย เรามีค่ายดีๆมานำเสนอ.. ค่ายที่จะเตรียมความพร้อมให้กับน้องๆ วิชาฟิสิกส์ เคมี และคณิตศาสตร์ รวมถึงการแชร์ประสบการณ์และตอบคำถามเกี่ยวกับการใช้ชีวิตในรั้วมหาวิทยาลัยให้กับน้องๆ โดยค่ายของเราจะจัดในช่วง 8 - 28 มิถุนายน 2562 (เช้า-เย็นกลับ ตั้งแต่ 8.00-16.00น.) สมัครได้เลยตั้งแต่วันนี้ - 11 พฤษภาคม 2562 สมัครได้ที่ : https://docs.google.com/forms/d/e/1FAIpQLSdUFaxcYpjzGEbdv_GPH9ClJ0IEgvVEubdd-weVdUiAadK6Nw/viewform?usp=pp_url',
    imgs:
      'https://scontent.fbkk2-8.fna.fbcdn.net/v/t1.0-9/57213740_2295430243857471_8275947601916854272_n.jpg?_nc_cat=103&_nc_ht=scontent.fbkk2-8.fna&oh=edadacf6e147e378e7108689f753e103&oe=5D5BD69C',
    timeStamp: null,
    rating: [],
    comments: [],
    user_id: '6NnzWdktyjVGpJa7eefrD85038k1',
    tag: ['Tutor', 'Engineering'],
    catalog: 'Learning'
  },
  /* Social */
  {
    title: 'Potenital MAXCAMP 2019',
    description:
      'ถ้าชีวิตเป็นเหมือน The Sims อยากจะทำอะไรกับชีวิตตัวเอง? ปิดเทอมนี้พบกับ เ ก ม ชี วิ ต ที่ค่าย ... 🌟🌟Potential Max camp 2019🌟🌟 25 พ.ค. - 1 มิ.ย. 2562 @เขาใหญ่ จ.นครราชสีมา 💸ค่าค่าย 700 บาท รับเฉพาะผู้เล่นปี 1-2 เท่านั้น! 👇สมัครได้ที่ https://goo.gl/c92JYj',
    imgs:
      'https://scontent.fbkk2-5.fna.fbcdn.net/v/t1.0-9/56670200_1718345688267838_2077404457632530432_n.jpg?_nc_cat=110&_nc_ht=scontent.fbkk2-5.fna&oh=f0823bf7a8e063232afa55147cd51849&oe=5D5FCD60',
    timeStamp: null,
    rating: [],
    comments: [],
    user_id: 'ssYE9ceTZcWDNDnQNDnuccJLEN33',
    tag: ['Camp', 'Potentialmaxcamp2019'],
    catalog: 'Social'
  },
  {
    title: 'SOCIAL SCIENCES SOCIAL RUN 2019 “วิ่งเพื่อสังคม”',
    description:
      '📌วันอาทิตย์ที่ 9 มิถุนายน 2562 👉สมัครได้แล้วที่ www.sockurun.com ⚠️ช่องทางติดต่อดูในเว็บเลยจ้า⚠️',
    imgs:
      'https://scontent.fbkk2-5.fna.fbcdn.net/v/t1.0-9/55916057_1648985145204898_3022305423190392832_n.png?_nc_cat=110&_nc_ht=scontent.fbkk2-5.fna&oh=12a2dbad8919222b86de3c26cc19be55&oe=5D2AFFBF',
    timeStamp: null,
    rating: [],
    comments: [],
    user_id: 'ssYE9ceTZcWDNDnQNDnuccJLEN33',
    tag: ['ทีมเกษตร','สังคมศาสตร์','SOCIALRUN2019'],
    catalog: 'Social'
  },
]

for (var i = 0; i < news.length; i++) {
  var timeStamp = new Date()
  news[i].timeStamp =
    '' +
    timeStamp.getDay() +
    '/' +
    (timeStamp.getMonth() + 1) +
    '/' +
    timeStamp.getFullYear() +
    '  time ' +
    timeStamp.getHours() +
    ':' +
    timeStamp.getMinutes() // store a timestamp as a field in the documents.
  newsCollection
    .child(news[i].catalog)
    .child(uuid.v4())
    .set(news[i])
    .then(function (docRef) {
      console.log('success')
    })
    .catch(function (error) {
      console.error('Error adding document: ', error)
    })
}
