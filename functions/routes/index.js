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
          console.log('paul')
          console.log(doc.val()[Object.keys(doc.val())[0]].user_id)
          usersRef.child(doc.val()[Object.keys(doc.val())[0]].user_id).on("value",function(snapshot){
          let eachNews = doc.val()
          console.log('ssp')
          console.log(eachNews)
          console.log('jjjjjjjjj')
          Object.keys(eachNews).forEach(e=>{
          var xs=eachNews[e]
          xs['id'] = e
          xs['author']={'user_id':snapshot.val().user_id,'img':snapshot.val().img,'displayName':snapshot.val().displayName}
          res_data.push(xs)
          })
        })
        })

        console.log('ssssssssss')
        console.log(res_data)
        successResponse(res, 'Get all news successfully.', res_data)
      })
  })
})

router.get('/campus/:campus', function (req, res, next) {
  cors(req, res, () => {
    var res_data = []
    let campus = req.params.campus
    var news =  newsCollection
      .child(campus)
      .orderByChild('timeStamp').on("value", function (snap) {
          snap.forEach(doc => {
          console.log('paul')
          console.log(doc.val())
          usersRef.child(doc.val().user_id).on("value",function(snapshot){
          console.log(snapshot.val())
          console.log('paul')
          let eachNews = doc.val()
          eachNews['id'] = doc.key
          eachNews['author']={'user_id':snapshot.val().user_id,'img':snapshot.val().img,'displayName':snapshot.val().displayName}
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
            usersRef.child(snap.val().user_id).on("value",function(snapshot){
            sk['author']={'user_id':snapshot.val().user_id,'img':snapshot.val().img,'displayName':snapshot.val().displayName}
            })
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
              successResponse(
                res,
                'Get news by specific id successfully.',
                sk
              )
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
              function (snap) {
                console.log(snap.val())
                if (snap.val() == null) {
                  console.log("No such document!")
                }
                else if (snap.val().rating == null) {
                  newsCollection
                    .child(catalog)
                    .child(newsId)
                    .child('rating')
                    .child(0)
                    .set(res_data)
                    
                    usersRef.child(decodedToken.uid).child('like_news').once('value',function(fish){
                      if(fish.val()!==null){
                      console.log('jpkjpjpjpjpjpx')
                      console.log(fish.val())
                      if(fish.val().includes(newsId)){
                      }else{
                        usersRef.child(decodedToken.uid).child('like_news').child(fish.val().length).set(newsId)
                      }
                      }else{
                      console.log('sdasdasdasdasdasdasdasdasdasdsadasdsadas')
                      usersRef.child(decodedToken.uid).child('like_news').child(0).set(newsId)
                      }
                    })
                  successResponse(res, 'Post comment successfully.', res_data)
                  return decodedToken.user_id
                }
                else {
                  console.log(snap.val().rating)
                  console.log(snap.val().rating.filter(e => e.user_id === decodedToken.user_id).length > 0)
                  if (snap.val().rating.filter(e => e.user_id === decodedToken.user_id).length > 0) {
                    console.log("User already like")
                    newsCollection.child(catalog).child(newsId).child('rating').set(snap.val().rating.filter(e => e.user_id !== decodedToken.user_id))
                    usersRef.child(decodedToken.uid).child('like_news').once('value',function(fish){
                    usersRef.child(decodedToken.uid).child('like_news').set(fish.val().filter(e=>e!==newsId))
                    })
                    successResponse(res, 'delete rating successfully.', res_data)
                    return
                  } else {
                    console.log(snap.val().rating.length)
                    newsCollection
                      .child(catalog)
                      .child(newsId)
                      .child('rating')
                      .child(snap.val().rating.length)
                      .set(res_data)
                      usersRef.child(decodedToken.uid).child('like_news').once('value', function(fish){
                        if(fish.val()!==null){
                        console.log('jpkjpjpjpjpjpx')
                        console.log(fish.val())
                        if(fish.val().includes(newsId)){

                        }else{
                          usersRef.child(decodedToken.uid).child('like_news').child(fish.val().length).set(newsId)
                        }
                        }else{
                        console.log('sdasdasdasdasdasdasdasdasdasdsadasdsadas')
                        usersRef.child(decodedToken.uid).child('like_news').child(0).set(newsId)
                        }
                      })
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
      .then(async function (decodedToken) {
        
        var timeStamp = new Date()
        res_data['user_id'] = decodedToken.uid
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
          .orderByChild('timeStamp').once("value", function (snap) {
            snap.forEach(doc => {
              console.log('sdasdasd')
              console.log(doc.val())
              if(doc.val()!==null){
              console.log(doc.val()[Object.keys(doc.val())[0]].user_id)
              usersRef.child(doc.val()[Object.keys(doc.val())[0]].user_id).on("value",function(snapshot){
              if(decodedToken.uid===snapshot.val().user_id){
              console.log(snapshot.val())
              let eachNews = doc.val()
              var xs=eachNews
              xs['id'] = Object.keys(eachNews)
              xs['author']={'user_id':snapshot.val().user_id,'img':snapshot.val().img,'displayName':snapshot.val().displayName}
              wrap.push(xs)
              }
            })}
            })
          })
        var newsId=uuid.v4()
        console.log(newsId)
        newsCollection.child(catalog).child(newsId).set(res_data)
       
        usersRef.child(decodedToken.uid).child('post_news').once('value',function(fish){
          console.log('ssssss')
          console.log(fish)
          console.log(fish.val())
          console.log(decodedToken.uid)
          if(fish.val()!==null){
            console.log('jpkjpjpjpjpjpx')
            console.log(fish.val())
            usersRef.child(decodedToken.uid).child('post_news').child(fish.val().length).set(newsId)
            }else{
            console.log('sdasdasdasdasdasdasdasdasdasdsadasdsadas')
            usersRef.child(decodedToken.uid).child('post_news').child(0).set(newsId)
            }
        })
        successResponse(res, 'Post comment successfully.', res_data)
        
      }).catch(err => {
        console.log(err)
      })
  })
})

module.exports = router