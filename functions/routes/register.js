var express = require('express')
var router = express.Router()

const {  cors ,firebaseDB,firebase,firebaseAuth  } = require('./../config/admin.js')

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
        disPlayName=req.body.disPlayName
        firebaseAuth.createUserWithEmailAndPassword(email, password).then((authData) => {
            console.log("User created successfully with payload-", authData);
            let data = {};
            data['mail'] = email;
            data['password'] = password;
            data['disPlayName'] = disPlayName
            usersRef.child(authData.uid).set(data)
            successResponse(res, 'regis successfully.', data)
        }).catch((_error) => {
            timeOutErrorResponse(res,_error)
        })
        
    })
  })

module.exports = router