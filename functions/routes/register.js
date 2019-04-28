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

router.post('/',function (req, res, next) {
    cors(req, res, () => {
        email=req.body.email
        password=req.body.password
        displayName=req.body.displayName
        firebaseAuth.createUserWithEmailAndPassword(email, password).then((authData) => {
            console.log("User created successfully with payload-", authData);
            let data = {};
            data['email'] = email;
            data['displayName'] = displayName
            data['img']='https://firebasestorage.googleapis.com/v0/b/uninews-api.appspot.com/o/default_user.png?alt=media&token=fdfe897b-5019-4fa7-861a-1afcc92b48f2'
            data['aboutUs']=''
            console.log("sddsdsdsds")
            console.log(authData.user.uid)
            usersRef.child(authData.user.uid).set(data)
            console.log("ssssss")
            successResponse(res, 'regis successfully.', data)
        }).catch((_error) => {
            timeOutErrorResponse(res,_error)
        })
        
    })
  })

module.exports = router