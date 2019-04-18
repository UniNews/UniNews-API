var express = require('express')
var router = express.Router()

const { firebase, firebaseDB, cors ,admin } = require('./../config/admin.js')

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
          let eachNews = doc.data()
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
      .child(id)
      .child('learn')
      .once('value')
      .then(snap => {
        if (snap.exists) {
          successResponse(
            res,
            'Get news by specific id successfully.',
            snap
          )
        } else {
          notFoundErrorResponse(
            res,
            'The request news id could not be founded.'
          )
        }
      })
      .catch(err => {
        timeOutErrorResponse(res, err)
      })
  })
})

router.post('/:id/comments', function (req, res, next) {
  cors(req, res, () => {
    let user_token = req.body.user_token
    let msg = req.body.msg
    let newsId = req.params.id
    var res_data = {}
    admin.auth()
      .verifyIdToken(user_token)
      .then(function (decodedToken) {
        res_data['user_id'] = decodedToken.user_id
        res_data['name'] = decodedToken.name
        res_data['msg'] = msg
        var query = newsCollection.child(catalog).child(newsId)
       .then(doc => {
           if (!doc.exists) {
              console.log("No such document!")
           } else {
        newsCollection
        .child(catalog)
        .child(newsId)
        .child('comments')
        .child(doc.data().comments.length-1)
        .setValue(res_data)
        successResponse(res, 'Post comment successfully.', res_data)
        return decodedToken.user_id
           }
      })
      .catch(function (error) {
        notFoundErrorResponse(res, 'Token is either expired or not valid.')
      })
  })
})})

router.post('/:id/rating', function (req, res, next) {
  cors(req, res, () => {
    let user_token = req.body.user_token
    let rating = req.body.rating
    let newsId = req.params.id
    let catalog = req.body.catalog
    var res_data = {}
     admin.auth()
     .verifyIdToken(user_token)
     .then(function (decodedToken) {
       res_data['user_id'] = decodedToken.user_id
       res_data['name'] = decodedToken.name
       var query = newsCollection.child(catalog).child(newsId)
       .then(doc => {
           if (!doc.exists) {
              console.log("No such document!")
           } else {
              if(doc.data().rating.length>0){
                res_data['rating']= (rating+doc.data().rating.length*doc.data().rating[doc.data().rating.length-1].rating)/(doc.data().rating.length+1)
              }
              else{
                res_data['rating']=rating
              }
              newsCollection
              .child(catalog)
              .child(newsId)
              .child('rating')
              .child(doc.data().rating.length-1)
              .setValue(res_data)
               successResponse(res, 'Post rating successfully.', res_data)
           }
       })
       .catch(err => {
           console.log('Error getting documents', err);
       }); 
      return decodedToken.user_id
     })
       .catch(function (error) {
         notFoundErrorResponse(res, 'Token is either expired or not valid.')
       })
  })
})

module.exports = router
