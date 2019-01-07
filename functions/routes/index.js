var express = require('express')
var router = express.Router()

const { firestore } = require('./../config/admin.js')

const newsCollection = firestore.collection('news')

const {
  notFoundErrorResponse,
  timeOutErrorResponse,
  successResponse
} = require('./../utils/response.js')

/* GET all news. */
router.get('/', function (req, res, next) {
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

/* Get by specific id */
router.get('/:id', function (req, res, next) {
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

module.exports = router
