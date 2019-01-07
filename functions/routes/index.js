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
  cors(
    (req,
    res,
    () => {
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
          successResponse(res, res_data)
        })
        .catch(err => {
          timeOutErrorResponse(res, err)
        })
    })
  )
})

/* Get by specific id */
router.get('/:id', function (req, res, next) {
  cors(
    (req,
    res,
    () => {
      let id = req.params.id
      var news = newsCollection
        .doc(id)
        .get()
        .then(snap => {
          if (snap.exists) {
            successResponse(res, snap.data())
          } else {
            notFoundErrorResponse(res)
          }
        })
        .catch(err => {
          timeOutErrorResponse(res, err)
        })
    })
  )

  router.post('/:id/comments', async (req, res, next) => {
    cors(
      (req,
      res,
      () => {
        let user_token = req.body.user_token
        let msg = req.body.msg
        let newsId = req.params.id
        let decodedIdToken
        try {
          var res_data = {}
          var getDoc = newsCollection
            .doc(newsId)
            .collection('comments')
            .get()
          decodedIdToken = await authService
            .verifyIdToken(user_token)
            .then(snap => {
              if (snap.exists) {
                res_data['id'] = snap.id
                res_data['name'] = snap.name
                res_data['msg'] = msg
                getDoc.push(res_data)
                successResponse(res, res_data)
              } else {
                notFoundErrorResponse(res)
              }
            })
        } catch (error) {
          timeOutErrorResponse(res, error)
        }
      })
    )
  })
})

module.exports = router
