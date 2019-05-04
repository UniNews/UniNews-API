var express = require('express')
var router = express.Router()

const {  cors ,firebaseDB,admin  } = require('./../config/admin.js')

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
router.post('/following',function(req, res, next){
  cors(req, res, () => {
      let user_token=req.body.user_token
      let user_id=req.body.user_id
      var data ={}
      admin.auth()
      .verifyIdToken(user_token)
      .then(function (decodedToken) {
        usersRef.child(decodedToken.uid).on("value", function (snap)
        {
          usersRef.child(user_id).on("value", function (sd){
          if (snap.val()==null || sd.val() == null) {
            console.log(snap.val())
            console.log(sd.val())
            console.log("No such document!")
         }
         else if(snap.val().following == null&&sd.val().follower == null)
         {
         usersRef.child(decodedToken.uid).child('following').child(0).set(user_id)
         usersRef.child(user_id).child('follower').child(0).set(decodedToken.uid)
         data['following']=decodedToken.uid
         data['follower']=user_id
         successResponse(res, 'Get all news successfully.', data)
         }else if(snap.val().following == null){
          usersRef.child(decodedToken.uid).child('following').child(0).set(user_id)
          usersRef.child(user_id).child('follower').child(snap.val().following.length).set(decodedToken.uid)
          data['following']=decodedToken.uid
          data['follower']=user_id
          successResponse(res, 'Get all news successfully.', data)
         }else if(sd.val().follower==null){
          usersRef.child(decodedToken.uid).child('following').child(snap.val().following.length).set(user_id)
          usersRef.child(user_id).child('follower').child(0).set(decodedToken.uid)
          data['following']=decodedToken.uid
          data['follower']=user_id
          successResponse(res, 'Get all news successfully.', data)
         }
         else{
          usersRef.child(decodedToken.uid).child('following').child(snap.val().following.length).set(user_id)
          usersRef.child(user_id).child('follower').child(snap.val().following.length).set(decodedToken.uid)
         data['Following']=decodedToken.uid
         data['Follower']=user_id
         successResponse(res, 'Get all news successfully.', data)
         }
        })
       })
      })
  })
})

module.exports = router