const uuid =require('uuid')
var express = require('express')
const {forEach} =require('p-iteration')
var router = express.Router()

const { firebaseDB, cors, admin } = require('./../config/admin.js')

var database = firebaseDB
var newsCollection = database.ref('news');
var usersRef = database.ref('user');

const {
  notFoundErrorResponse,
  timeOutErrorResponse,
  successResponse
} = require('./../utils/response.js')

/* GET all news. */
router.get('/', function (req, res, next) {
  cors(req, res, () => {
    var res_data = []
    var news =  newsCollection
      .orderByChild('timeStamp').on("value",async function (snap) {
        snap.forEach(doc => {
          usersRef.child(doc.val()[Object.keys(doc.val())[0]].user_id).on("value",function(snapshot){
          let eachNews = doc.val()
          var xs=eachNews[Object.keys(eachNews)]
          xs['id'] = Object.keys(eachNews)[0]
          xs['author']={'user_id':snapshot.val().user_id,'img':snapshot.val().img,'displayName':snapshot.val().displayName}
          res_data.push(xs)
        })
        })

        console.log('ssssssssss')
        console.log(res_data)
        successResponse(res, 'Get all news successfully.', res_data)
      })
  })
})

router.get('/campus/:campus', function (req, res, next) {
  cors(req, res, async() => {
    var res_data = []
    let campus = req.params.campus
    var news = await newsCollection
      .child(campus)
      .orderByChild('timeStamp').on("value",async function (snap) {
          snap.forEach(doc => {
          console.log('paul')
          console.log(doc.val())
          usersRef.child(doc.val().user_id).on("value",function(snapshot){
          console.log(snapshot.val())
          console.log('paul')
          let eachNews = doc.val()
          eachNews['id'] = doc.key
          res_data.push(eachNews)
          console.log('dddd')
          console.log(res_data)
          })
        })
      })
      console.log('ssssssssss')
      console.log(res_data)
      successResponse(res, 'Get all news successfully.', res_data)
  })
})



/* Get by specific id */
router.get('/:id', function (req, res, next) {
  cors(req, res, () => {
    let id = req.params.id
    var catalogs = ['Restaurants', 'Accommodation', 'Official News', 'Social', 'Learning', 'Love']
    catalogs.forEach(function (catalog) {
      var news = newsCollection
        .child(catalog)
        .child(id)
        .on("value", async function (snap) {
          if (snap.val() !== null) {
            sk = snap.val()
            console.log(sk.comments)
            if(sk.comments){
            for (const e of sk.comments) {
              var user = await usersRef.child(e.user_id).once("value", function (sd) {
                console.log(sd.val())
                console.log("sssssss")
                e['displayName'] = sd.val().displayName
                e['img'] = sd.val().img
                console.log('ssdsdsdsdsdsds')
                console.log(e)
              })
            }
            sk.comments.reverse()
            console.log(sk)
            successResponse(
              res,
              'Get news by specific id successfully.',
              sk
            )
            }
            else{
              console.log('no comments')
            }
          } else {
            console.log('not found')
          }
        })

    })
  })
})


router.post('/:id/comments', function (req, res, next) {
  cors(req, res, () => {
    let user_token = req.body.user_token
    let msg = req.body.msg
    let newsId = req.params.id
    var catalogs = ['Restaurants', 'Accommodation', 'Official News', 'Social', 'Learning', 'Love']
    var res_data = {}
    admin.auth()
      .verifyIdToken(user_token)
      .then(function (decodedToken) {
        res_data['user_id'] = decodedToken.user_id
        res_data['msg'] = msg
        catalogs.forEach(function (catalog) {
          var query = newsCollection.child(catalog).child(newsId)
            .once("value",
              function (snap) {
                if (snap.val() == null) {
                  console.log("No such document!")
                }
                else if (snap.val().comments == null) {
                    usersRef.child(decodedToken.user_id).once("value",function(snapshot){
                      console.log(snapshot.val().displayName)
                      res_data['displayName']=snapshot.val().displayName
                      newsCollection
                    .child(catalog)
                    .child(newsId)
                    .child('comments')
                    .child(0)
                    .set(res_data)
                    successResponse(res, 'Post comment successfully.', res_data)
                    return decodedToken.user_id
                    })
                }
                else {
                  console.log(snap.val().comments.length)
                  usersRef.child(decodedToken.user_id).once("value",function(snapshot){
                    res_data['displayName']=snapshot.val().displayName
                  newsCollection
                    .child(catalog)
                    .child(newsId)
                    .child('comments')
                    .child(snap.val().comments.length)
                    .set(res_data)
                  successResponse(res, 'Post comment successfully.', res_data)
                  return decodedToken.user_id
                  })
                }
              })
        }
        )
      })
  })
})

router.post('/:id/rating', function (req, res, next) {
  cors(req, res, () => {
    let user_token = req.body.user_token
    let newsId = req.params.id
    var catalogs = ['Restaurants', 'Accommodation', 'Official News', 'Social', 'Learning', 'Love']
    var res_data = {}
    admin.auth()
      .verifyIdToken(user_token)
      .then(function (decodedToken) {
        res_data['user_id'] = decodedToken.user_id
        catalogs.forEach(function (catalog) {
          var query = newsCollection.child(catalog).child(newsId)
            .once("value",
              async function (snap) {
                console.log(snap.val())
                if (snap.val() == null) {
                  console.log("No such document!")
                }
                else if (snap.val().rating == null) {
                  var wrap=[]
                  var news =await newsCollection
                  .orderByChild('timeStamp').on("value", function (snap) {
                   snap.forEach(doc => {
                    newsCollection
                    .child(catalog)
                    .child(newsId)
                    .child('rating')
                    .child(0)
                    .set(res_data)
                    usersRef.child(doc.val()[Object.keys(doc.val())[0]].user_id).on("value",function(snapshot){
                    if(snapshot.val().rating.includes(decodedToken.uid)){
                          console.log(snapshot.val())
                          let eachNews = doc.val()
                          var xs=eachNews[Object.keys(eachNews)]
                          xs['id'] = Object.keys(eachNews)
                          xs['author']={'user_id':snapshot.val().user_id,'img':snapshot.val().img,'displayName':snapshot.val().displayName}
                           wrap.push(xs)
                         }
                     })
                     })})
                     res_data['like_news']=wrap
                     newsCollection
                     .child(catalog)
                     .child(newsId)
                     .child('rating')
                     .child(0)
                     .set(res_data)
                     usersRef.child(decodedToken.uid).child('like_news').set(wrap)
                   successResponse(res, 'Post comment successfully.', res_data)
                  res_data['post_news']=wrap
                  return decodedToken.user_id
                }
                else {
                  console.log(snap.val().rating)
                  console.log(snap.val().rating.filter(e => e.user_id === decodedToken.user_id).length > 0)
                  if (snap.val().rating.filter(e => e.user_id === decodedToken.user_id).length > 0) {
                    console.log("User already like")
                    usersRef.child(doc.val()[Object.keys(doc.val())[0]].user_id).on("value",function(snapshot){
                      if(snapshot.val().rating.includes(decodedToken.uid)){
                            console.log(snapshot.val())
                            let eachNews = doc.val()
                            var xs=eachNews[Object.keys(eachNews)]
                            xs['id'] = Object.keys(eachNews)
                            xs['author']={'user_id':snapshot.val().user_id,'img':snapshot.val().img,'displayName':snapshot.val().displayName}
                             wrap.remove(xs)
                           }
                       })
                    newsCollection.child(catalog).child(newsId).child('rating').set(snap.val().rating.filter(e => e.user_id !== decodedToken.user_id))
                    usersRef.child(decodedToken.uid).child('like_news').on('value',function(dat){
                      usersRef.child(decodedToken.uid).child('like_news').set(dat.val().like_news.filter(ex=>ex.user_id!==decodedToken.user_id))
                    })
                    successResponse(res, 'delete rating successfully.', res_data)
                    return
                  } else {
                    console.log(snap.val().rating.length)
                    var wrap=[]
                    var news =await newsCollection
                    .orderByChild('timeStamp').on("value", function (snap) {
                     snap.forEach(doc => {
                      num_length=snap.val().rating.length
                      newsCollection
                      .child(catalog)
                      .child(newsId)
                      .child('rating')
                      .child(num_length)
                      .set(res_data)
                      usersRef.child(doc.val()[Object.keys(doc.val())[0]].user_id).on("value",function(snapshot){
                      if(snapshot.val().rating.includes(decodedToken.uid)){
                            console.log(snapshot.val())
                            let eachNews = doc.val()
                            var xs=eachNews[Object.keys(eachNews)]
                            xs['id'] = Object.keys(eachNews)
                            xs['author']={'user_id':snapshot.val().user_id,'img':snapshot.val().img,'displayName':snapshot.val().displayName}
                             wrap.push(xs)
                           }
                       })
                       })})
                       res_data['like_news']=wrap
                       newsCollection
                       .child(catalog)
                       .child(newsId)
                       .child('rating')
                       .child(num_length)
                       .set(res_data)
                       usersRef.child(decodedToken.uid).child('like_news').set(wrap)
                    successResponse(res, 'Post comment successfully.', res_data)
                    return decodedToken.user_id
                  }
                }
              })
        })
      }).catch(err => {
        console.log(err)
      })
  })
})

router.post('/addnews', function (req, res, next) {
  cors(req, res, () => {
    var user_token = req.body.user_token
    var catalog = req.body.catalog
    var description = req.body.description
    var imgs = req.body.imgs
    var timeStamp = req.body.timeStamp
    var title = req.body.title
    var tag = req.body.tag
    var res_data = {}
    admin.auth()
      .verifyIdToken(user_token)
      .then(function (decodedToken) {
        usersRef.child(decodedToken.uid).once("value",async function(snap){
        var timeStamp = new Date()
        res_data['author'] = decodedToken.uid
        res_data['catalog'] = catalog
        res_data['description'] = description
        res_data['imgs'] = imgs
        res_data['timeStamp'] = ''+timeStamp.getDay()+'/'+(timeStamp.getMonth()+1)+'/'+timeStamp.getFullYear()+'  time '+timeStamp.getHours()+':'+timeStamp.getMinutes() // store a timestamp as a field in the documents.
        res_data['title'] = title
        res_data['tag'] = tag
        res_data['comments'] = []
        res_data['rating'] = []
        var wrap=[]
        var news =await newsCollection
          .orderByChild('timeStamp').on("value", function (snap) {
            snap.forEach(doc => {
              usersRef.child(doc.val()[Object.keys(doc.val())[0]].user_id).on("value",function(snapshot){
              if(decodedToken.uid===snapshot.val().user_id){
              console.log(snapshot.val())
              let eachNews = doc.val()
              var xs=eachNews[Object.keys(eachNews)]
              xs['id'] = Object.keys(eachNews)
              xs['author']={'user_id':snapshot.val().user_id,'img':snapshot.val().img,'displayName':snapshot.val().displayName}
              wrap.push(xs)
              }
            })
            })})
        res_data['post_news']=wrap
        newsCollection.child(catalog).child(uuid.v4()).set(res_data)
        successResponse(res, 'Post comment successfully.', res_data)
        })
      }).catch(err => {
        console.log(err)
      })
  })
})

module.exports = router