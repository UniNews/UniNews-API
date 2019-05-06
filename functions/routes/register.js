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

router.post('/',function (req, res, next) {
    cors(req, res, () => {
        user_token=req.body.user_token
        displayName=req.body.displayName
            let data = {};
            admin.auth()
            .verifyIdToken(user_token)
            .then(function (decodedToken) {
            data['user_id']=decodedToken.uid
            data['displayName'] = displayName
            data['img']='https://firebasestorage.googleapis.com/v0/b/uninews-api.appspot.com/o/default_user.png?alt=media&token=fdfe897b-5019-4fa7-861a-1afcc92b48f2'
            data['aboutMe']=''
            data['permission']=false
            data['following']=[]
            data['follower']=[]
            console.log("sddsdsdsds")
            console.log(decodedToken.uid)
            usersRef.child(decodedToken.uid).set(data)
            console.log("ssssss")
            successResponse(res, 'regis successfully.', data)
            }).catch(err=>{
              timeOutErrorResponse(res,err)
            })
        
    })
  })

module.exports = router