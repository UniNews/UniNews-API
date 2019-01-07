var express = require('express')
var router = express.Router()

const { firestore, authService, cors } = require('./../config/admin.js')

const newsCollection = firestore.collection('news')

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
      .orderBy('timeStamp', 'desc')
      .get()
      .then(snap => {
        snap.forEach(doc => {
          let eachNews = doc.data()
          eachNews['id'] = doc.id
          res_data.push(eachNews)
        })
        successResponse(res, 'Get all news successfully.', res_data)
      })
      .catch(err => {
        timeOutErrorResponse(res, err)
      })
  })
})

/* Get by specific id */
router.get('/:id', function (req, res, next) {
  cors(req, res, () => {
    let id = req.params.id
    var news = newsCollection
      .doc(id)
      .get()
      .then(snap => {
        if (snap.exists) {
          successResponse(
            res,
            'Get news by specific id successfully.',
            snap.data()
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
    var getDoc = newsCollection
      .doc(newsId)
      .collection('comments')
      .get()
    authService
      .verifyIdToken(user_token)
      .then(function (decodedToken) {
        res_data['id'] = decodedToken.id
        res_data['name'] = decodedToken.name
        res_data['msg'] = msg
        // getDoc.push(res_data)
        successResponse(res, 'Post comment successfully.', res_data)
      })
      .catch(function (error) {
        notFoundErrorResponse(res, 'Token is either expired or not valid.')
      })
  })
})

module.exports = router
