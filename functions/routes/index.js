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
  res_data = {}
  res_data['news'] = []
  let getNews = newsCollection
    .orderBy('timeStamp', 'desc')
    .get()
    .then(snap => {
      snap.forEach(doc => {
        let eachNews = doc.data()
        eachNews['id'] = doc.id
        res_data['news'].push(eachNews)
      })
      successResponse(res, res_data)
    })
    .catch(err => {
      timeOutErrorResponse(res, res_data)
    })
})

/* Get by specific id */
router.get('/:id', function (req, res, next) {
  let id = req.params.id
  var news = newsCollection
    .doc(id)
    .get()
    .then(snap => {
      res_data = {}
      if (snap.exists) {
        res_data['news'] = snap.data()
        successResponse(res, res_data)
      } else {
        notFoundErrorResponse(res, res_data)
      }
    })
    .catch(err => {
      timeOutErrorResponse(res, res_data)
    })
})

module.exports = router
