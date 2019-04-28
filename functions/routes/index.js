var express = require('express')
var router = express.Router()

const { firebaseDB, cors ,admin } = require('./../config/admin.js')

var database = firebaseDB
var newsCollection = database.ref('news');


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
          eachNews['id'] = doc.id
          res_data.push(eachNews)
        })
        successResponse(res, 'Get all news successfully.', res_data)
      })
  })
})

router.get('/:campus', function (req, res, next) {
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
          eachNews['id'] = doc.id
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
    var news = newsCollection
      .child('learn')
      .child(id)
      .on("value",
      function(snap) {
        console.log('pauls')
        console.log(snap)
        if (snap.val()!==null) {
          successResponse(
            res,
            'Get news by specific id successfully.',
            snap.val()
          )
        } else {
          var news = newsCollection
      .child('social')
      .child(id)
      .on("value",
      function(snap) {
        console.log('pauls')
        console.log(snap)
        if (snap.val()!==null) {
          successResponse(
            res,
            'Get news by specific id successfully.',
            snap.val()
          )
        } else {
          notFoundErrorResponse(
            res,
            'The request news id could not be founded.'
          )
        }
      })
        }
      })
  })
})

router.post('/:id/comments', function (req, res, next) {
  cors(req, res, () => {
    let user_token = req.body.user_token
    let msg = req.body.msg
    let newsId = req.params.id
    let catalog = req.body.catalog
    var res_data = {}
    admin.auth()
      .verifyIdToken(user_token)
      .then(function (decodedToken) {
        res_data['user_id'] = decodedToken.user_id
        res_data['msg'] = msg
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
  })
})})

router.post('/:id/rating', function (req, res, next) {
  cors(req, res, () => {
    let user_token = req.body.user_token
    let newsId = req.params.id
    let catalog = req.body.catalog
    var res_data = {}
    admin.auth()
      .verifyIdToken(user_token)
      .then(function (decodedToken) {
        res_data['user_id'] = decodedToken.user_id
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
      })
  })
})})

module.exports = router
