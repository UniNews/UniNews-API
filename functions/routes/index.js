var express = require('express')
var router = express.Router()

const { firebaseDB, cors ,admin } = require('./../config/admin.js')

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
    var news = newsCollection
      .orderByChild('timeStamp').on("value", function (snap)
       {
        snap.forEach(doc => {
          console.log(doc)
          console.log('paul')
          let eachNews = doc.val()
          res_data.push(eachNews)
        })
        successResponse(res, 'Get all news successfully.', res_data)
      })
  })
})

router.get('/campus/:campus', function (req, res, next) {
  cors(req, res, () => {
    var res_data = []
    let campus = req.params.campus
    var news = newsCollection
      .child(campus)
      .orderByChild('timeStamp').on("value", function (snap)
       {
        snap.forEach(doc => {
          console.log(doc)
          console.log('paul')
          let eachNews = doc.val()
          eachNews['id'] = doc.key
          res_data.push(eachNews)
        })
        successResponse(res, 'Get all news successfully.', res_data)
      })
  })
})


/* Get by specific id */
router.get('/:id', function (req, res, next) {
  cors(req, res, () => {
    let id = req.params.id
    var catalogs = ['Ask Questions','Doom Review','Official News','Personals','Subject Review','Talks','Tutors']
    catalogs.forEach(function(catalog){ 
    var news = newsCollection
      .child(catalog)
      .child(id)
      .once("value",
      async function(snap) {
        if (snap.val()!==null) {
           sk=snap.val()
           var k=await sk.comments.filter(async function(e){
            //console.log('sssssssssss')
            var user =await usersRef.child(e.user_id).once("value",async function(sd){
            }).then(x=>{
              console.log(x.val())
              e['displayName']=x.val().displayName
              e['img']=x.val().img
              return e
            })
            console.log(e)
            return e

          })
          successResponse(
            res,
            'Get news by specific id successfully.',
            k
            )
          
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
    var catalogs = ['Ask Questions','Doom Review','Official News','Personals','Subject Review','Talks','Tutors']
    var res_data = {}
    admin.auth()
      .verifyIdToken(user_token)
      .then(function (decodedToken) {
        res_data['user_id'] = decodedToken.user_id
        res_data['msg'] = msg
      catalogs.forEach(function(catalog){ 
        var query = newsCollection.child(catalog).child(newsId)
       .once("value",
       function(snap) { 
         console.log(snap.val())
           if (snap.val()==null) {
              console.log("No such document!")
           }
           else if(snap.val().comments == null)
           {
        newsCollection
        .child(catalog)
        .child(newsId)
        .child('comments')
        .child(0)
        .set(res_data)
        successResponse(res, 'Post comment successfully.', res_data)
        return decodedToken.user_id
           }
            else {
        console.log(snap.val().comments.length)
        newsCollection
        .child(catalog)
        .child(newsId)
        .child('comments')
        .child(snap.val().comments.length)
        .set(res_data)
        successResponse(res, 'Post comment successfully.', res_data)
        return decodedToken.user_id
           }
      })
    }
)})
})})

router.post('/:id/rating', function (req, res, next) {
  cors(req, res, () => {
    let user_token = req.body.user_token
    let newsId = req.params.id
    var catalogs = ['Ask Questions','Doom Review','Official News','Personals','Subject Review','Talks','Tutors']
    var res_data = {}
    admin.auth()
      .verifyIdToken(user_token)
      .then(function (decodedToken) {
        res_data['user_id'] = decodedToken.user_id
        catalogs.forEach(function(catalog){
        var query = newsCollection.child(catalog).child(newsId)
       .once("value",
       function(snap) { 
         console.log(snap.val())
           if (snap.val()==null) {
              console.log("No such document!")
           }
           else if(snap.val().rating == null)
           {
        newsCollection
        .child(catalog)
        .child(newsId)
        .child('rating')
        .child(0)
        .set(res_data)
        successResponse(res, 'Post comment successfully.', res_data)
        return decodedToken.user_id
           }
            else {
              console.log(snap.val().rating)
              console.log(snap.val().rating.filter(e => e.user_id === decodedToken.user_id).length > 0)
        if(snap.val().rating.filter(e => e.user_id === decodedToken.user_id).length > 0){
          console.log("User already like")
          newsCollection.child(catalog).child(newsId).child('rating').set(snap.val().rating.filter(e => e.user_id !==decodedToken.user_id))
          successResponse(res, 'delete rating successfully.', res_data)
          return
        }else{
        console.log(snap.val().rating.length)
        newsCollection
        .child(catalog)
        .child(newsId)
        .child('rating')
        .child(snap.val().rating.length)
        .set(res_data)
        successResponse(res, 'Post comment successfully.', res_data)
        return decodedToken.user_id
        }
           }
      })})
  }).catch(err =>{
    console.log(err)
  })
})})

module.exports = router
