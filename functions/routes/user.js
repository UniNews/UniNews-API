var express = require('express')
var router = express.Router()

const {  cors ,firebaseDB,firebaseAuth  } = require('./../config/admin.js')

var database = firebaseDB
var usersRef = database.ref('user');

const {
  notFoundErrorResponse,
  timeOutErrorResponse,
  successResponse
} = require('./../utils/response.js')

router.get('/:id',function (req, res, next) {
    cors(req, res, () => {
        let id = req.params.id
        data = {}
        usersRef.child(id).on("value", function (snap)
        {
         data=snap.val()
         successResponse(res, 'Get all news successfully.', data)
       })
        
    })
  })

module.exports = router